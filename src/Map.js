import React, { Component } from 'react';
import './App.css';
import Input from './Input';
import Table from './Table';
import ol from 'openlayers';

class MapReact extends Component {
  constructor(props) {
    super(props);
    this.handleCoordsChange = this.handleCoordsChange.bind(this);
    this.handleCoordsSubmit = this.handleCoordsSubmit.bind(this);
    this.handleWKTChange = this.handleWKTChange.bind(this);
    this.state = {coords: '', masOfLayers: []};
    this.baseLayer = new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: 'http://tiles.maps.sputnik.ru/{z}/{x}/{y}.png'
      })
    });
    this.baseView = new ol.View({
      center: [0, 0], 
      zoom: 2
    });
    this.map = new ol.Map({
      controls: ol.control.defaults().extend([new ol.control.FullScreen()]),
      layers: [ this.baseLayer, new ol.layer.Vector()],
      view: this.baseView
    });
  }

  handleCoordsChange(newCoords) {
    this.setState({coords: newCoords});
  }

  handleCoordsSubmit(e) {
    e.preventDefault();
    //alert("Submitted: " + this.state.coords);
    const mas = this.state.masOfLayers;
    const coords = this.state.coords;
    if (mas.indexOf(coords) === -1) {
      try {
        var feature = new ol.format.WKT().readFeature(coords, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
          });
      } catch (err) {
        alert("Invalid geometry!");
        this.setState({coords: ''});
        return null;
      }
      const vectorLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
          features: [feature]
        })
      });

      mas.push(coords);
      this.setState({masOfLayers: mas});
      //alert(mas.length);

      var layerToDel = this.map.getLayers().getArray();
      this.map.removeLayer(layerToDel[1]);
      this.map.addLayer(vectorLayer);
      this.setState({coords: ''});
    } else {
      alert("You have already added this geometry!");
    }
  }

  handleWKTChange(e, num) {
    e.preventDefault();
    const mas = this.state.masOfLayers;
    var feature = new ol.format.WKT().readFeature(mas[num], {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    });
    const vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [feature]
      })
    });
    var layerToDel = this.map.getLayers().getArray();
    this.map.removeLayer(layerToDel[1]);
    this.map.addLayer(vectorLayer);
  }

  componentDidMount() {
    const container = document.getElementById("map");
    this.map.setTarget(container);
  }

  render() {
    const coords = this.state.coords;
    const mas = this.state.masOfLayers;
    return (
        <div id="map">
          <Input coordinates={coords} onInputChange={this.handleCoordsChange} onSubmit={this.handleCoordsSubmit}/>
          <Table content={mas} onWKTChange={this.handleWKTChange}/>
        </div>
    );
  }

}

export default MapReact;

//Polygon((10.689 -25.092, 34.595 -20.170, 38.814 -35.639, 13.502 -39.155, 10.689 -25.092))
//Polygon((20.689 -25.092, 44.595 -20.170, 48.814 -35.639, 23.502 -39.155, 20.689 -25.092))
//LineString (30 10, 10 30, 40 40)
//Point(34.595 -20.170)