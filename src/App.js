import React from 'react';
import TreeReact from './Tree';
import MapReact from './Map';

function App(props) {
  return (
		<table>
			<tbody>
	      <tr>
	        <td id="left-side">
	        	<TreeReact t_root={props.data}/>
	        </td>
	        <td id="right-side" width="100%" height="50%">
	        	<MapReact />
	        </td>
	      </tr>
      </tbody>
     </table>
  );
}

export default App;