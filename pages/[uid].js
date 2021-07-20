import React from 'react'
//uid is not pre-Genreate bucz im im use server side props but still pre -render page on server

const UserID = (props) => {
    return (
        <div>
            {props.id}
        </div>
    )
}
export default UserID
export async function getServerSideProps(context){
  const{params}=context;
    const userID=params.uid;
    return{
        props:{
            id: "userId"+userID
        }
    }
}


