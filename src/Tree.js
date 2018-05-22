import React from 'react';
import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';

class TreeReact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {arr: [this.props.t_root]};
  }

  render() {
  	const loop = (dat) => {
      return dat.map((item) => {
        if (item.children) {
          return <TreeNode title={item.data.name} key={item.data.id}>{loop(item.children)}</TreeNode>;
        }
        return (
          <TreeNode title={item.data.name} key={item.data.id}/>
        );
      });
    };
    const treeNodes = loop(this.state.arr);

    return (
    <div style={{ margin: '0 20px' }}>
      <h2>Дерево слоев</h2>
    	<Tree showLine checkable defaultExpandAll>
    		{treeNodes}
    	</Tree>
    </div>);
  }
}

export default TreeReact;