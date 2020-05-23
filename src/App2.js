import React, {useState, useEffect} from "react";
import axios from "axios";

/*
  const [변수명, 메소드]= useState("[]") ("[]") ("0")
  메소드 = setter
  [music, setMusic]
*/
function App2() {
    // var 은 전역, let 은 지역
    const [music, setMusic] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/music.json")
            .then((res) => {   // res에 데이터 불러옴
                setMusic(res.data);
                console.log(res.data);
            })
    },[]);
    // 시작하자마자 한번만 읽음 : didMount 에만 함수를 적용하고 싶다면 함수의 2번째 인자로 [] deps 를 줘야함.
    // 내용 갱신 : deps 안씀.

    // useState : 데이터를 불러옴
    // useEffect : 데이터를 변경
    // = componentDidMount(){
    //     this.setstate({music:})
    // }

    //render()
    // html 출력시에는 다중 조건문을 사용
    const html = music.map((m)=>
        <tr>
            <td>{m.rank}</td>
            <td>
                {
                    m.state==="상승" &&
                    <span style={{"color":"red"}}>▲{m.idcrement}</span>
                }
                {
                    m.state==="하강" &&
                    <span style={{"color":"blue"}}>▼{m.idcrement}</span>
                }
                {
                    m.state==="유지" &&
                    <span style={{"color":"grey"}}>-</span>
                }

            </td>
            <td><img src={m.poster} width={"35"} height={"35"}/></td>
            <td>{m.title}</td>
            <td>{m.singer}</td>
        </tr>
    )

    return(
        <div className={"row"}>
        <H/>
        <div style={{"height":"30px"}}></div>
            <table className={"table"}>
                <thead>
                    <tr className={"success"}>
                        <th>순위</th>
                        <th>등폭</th>
                        <th></th>
                        <th>노래명</th>
                        <th>가수명</th>
                    </tr>
                </thead>
                <tbody>
                    {html}
                </tbody>
            </table>
        </div>
    )
}

const H= ()=>{
    const color =["red","orange","pink","yellow","blue"];
    const no = parseInt(Math.random()*5); // random(0.0~0.99)
    return(
        <h1 className={"text-center"} style={{"color":color[no]}}>Music Top50</h1>
    ) // color 는 이벤트발생시에도 계속 변화될 수 있음. useMemo 를 이용하여 처음값을 고정 가능
}

const H2= function () {
    return(
        <h1 className={"text-center"}>Music Top50</h1>
    )
}

/*function H() {
    return (
        <h1 className={"text-center"}>Music Top50</h1>
    )
}*/

export default App2;