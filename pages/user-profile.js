import React from 'react'

function UserProFilePage(props) {
    return <p>{props.username}</p>
       
}

export default UserProFilePage

export async function getServerSideProps(context){
    const{params,req,res}=context
   console.log("server")
    return{
        props:{
            username:'Max'
        }
    }
}


