import React from "react";
import { useEffect, useState } from "react";
import useSWR from "swr";
//SWR built in function to catching data and Revalidate data

function LastSalePage(props) {
  const [sales, Setsale] = useState(props.sales);// Pre render
  const [Isloading, Setloading] = useState(false);
  const { data, error } = useSWR(
    "https://nextjs-cource-6f695-default-rtdb.firebaseio.com/sales.json"
  );

  useEffect(() => {
    if (data) {
      const transformdata = [];
      for (const key in data) {
        transformdata.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      Setsale(transformdata);
    }
  }, [data]);
  

  if (error) {
    return <p>---Failed to Loading </p>;
  }
  if (!data && !sales) {
    return <p>Loding.....</p>;
  }

  //------owen ----- Loggic
  // useEffect(() => {
  //   Setloading(true);
  //   fetch("https://nextjs-cource-6f695-default-rtdb.firebaseio.com/sales.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformdata = [];
  //       for (const key in data) {
  //         transformdata.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //         console.log(transformdata);
  //         Setsale(transformdata);
  //         Setloading(false);
  //       }
  //     });
  // }, []);
  // if (Isloading) {
  //   return <p>Loding will wait....</p>;
  // }
  // if (!sales) {
    //   return <p>No data </p>;
    // }
  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}
export async function getStaticProps(context){
  const response = await fetch("https://nextjs-cource-6f695-default-rtdb.firebaseio.com/sales.json")
  const data=await response.json();
  const Transformdatajson=[]
  for(var key in data){
    Transformdatajson.push({
      id:key,
      usrname: data[key].username,
      volume: data[key].volume
    })
  }
  return{props:{sales:Transformdatajson}}
}

export default LastSalePage