import React from 'react'
import { BackendPort } from '../Const/url'


function Update() {
  const [data, setData] = React.useState()
  async function getUpdates() {
    const response = await fetch(`${BackendPort}/admin/update`)
    const json =await response.json()
    
    
    if (json.sucess) setData(json.data)
    else return
  }
  React.useEffect(() => {
    getUpdates()
  }, [])

  console.log(data)
  return !data ? null :  (
    data.map((data)=>{
     return <div key={data._id} className="flex justify-center items-center mx-auto my-4 p-4 bg-yellow-200 border border-yellow-400 text-yellow-800 rounded-lg shadow-md animate-pulse max-w-md">
      <div className="flex flex-col items-center">
        {console.log(data.ImageUrl)}
        {/* <!-- Posted on June 1st --> */}
        <span className="p-2 m-2 text-center">{data.Description}</span>
        <img className="rounded-xl shadow-2xl" src={data.ImageUrl} alt="IPTV"></img>
      </div>
    </div>
    })
  )
}

export default Update
