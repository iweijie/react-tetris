import React, { Component } from 'react'

class App extends Component {
 
//   blendHandle = (map,currentMap)=>{
// 	if(!currentMap || !currentMap.site) return [];
// 	let newMap = [...map];
// 	let {index,seat,site} = currentMap;
// 	let now = site[index].map;
// 	let info = site[index].info;
// 	var len = now.length -1 ;
// 	let [l,t] = seat;
// 	var showArr = [];
// 	now.forEach((v,k)=>{
// 		let s = t-len + k
// 		if(s>=0){
// 			showArr.push({
// 				line:s,
// 				value:v
// 			})
// 		}
// 	})
// 	showArr.forEach(v=>{
// 		let {line,value} = v;
// 		if(line >= 20) return ;
// 		let arr = [...newMap[line]];
// 		let spliceArr;
// 		if(l >= 0){
// 			spliceArr = arr.splice(l,info.len)
// 			spliceArr = spliceArr.map((v,k)=>{
// 				return value[k] || v
// 			})
// 			arr.splice(l,0,...spliceArr)
// 		}else {
// 			var abs = Math.abs(l)
// 			let len = info.len - abs
// 			spliceArr = arr.splice(0,len)
// 			spliceArr = spliceArr.map((v,k)=>{
// 				return value[k+abs] || v
// 			})
// 			arr.splice(0,0,...spliceArr)

// 		}
// 		newMap.splice(line,1,arr)
// 	}) 
// 	return newMap
//   }
  render () {
    let {map} = this.props;
    const content = (
        <div className="_6pVK">
            {
                map.map((v,k)=>{
                    let bs = v.map((val,kes)=>{
                        let className = val?val === 1?"c":"d":""
                        return <b key={kes} className={className}></b>
                    })
                    return <p key={k}>{bs}</p>
                })
            }
        </div>

    )

    return (
      content
    )
  }
}

export default App
