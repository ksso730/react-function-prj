import React, {useState, useEffect, useCallback, useMemo} from "react";
import axios from "axios";
import {Fragment} from "react";

// Container
function App3() {
    // 변수 설정
    const [music, setMusic] = useState([]);
    // 변수 초기값
    const [str, setStr]= useState("");

    useEffect(()=>{
        axios.get("http://localhost:3000/music.json")
            .then((res)=>{
                setMusic(res.data);
            })
    },[])  // mount 할때마다 실행. => componentDidMount, componentDidUpdate

    // 이벤트 등록
    const handleUserInput= useCallback((str)=>{
        setStr(str);
    }, [str]) // str 이 변경될 때에만 호출된다.
    
    return(
        <div className={"row"}>
            <H2/>
            <H/>
            <SearchBar str={str} onUserInput={handleUserInput}/>
            <div style={{"height":"30px"}}></div>
            <MusicTable music={music} str={str}/>
        </div>
    )
}

/*
    var n = s.indexof("k"); 없으면 => -1
*/
function MusicTable(props) {
    let row=[];
    props.music.forEach((m)=>{
        if(m.title.indexOf(props.str)==-1){
            return;
        }
        // 배열에 추가
        row.push(<MusicRow music={m}/>);
    })

    return(
        <table className={"table"}>
            <thead>
                <tr className={"danger"}>
                    <th>순위</th>
                    <th></th>
                    <th>노래명</th>
                    <th>가수</th>
                </tr>
            </thead>
            <tbody>
            {row}
            </tbody>
        </table>
    )
}

function MusicRow(props) {
    let music = props.music;
    return(
        <tr>
            <td>{music.rank}</td>
            <td><img src={music.poster} width={"30"} height={"30"}/></td>
            <td>{music.title}</td>
            <td>{music.singer}</td>
        </tr>
    )
}

function SearchBar(props) {
    // useCallBack
    const onChange=(e)=>{
        props.onUserInput(e.target.value);
    }

    return(
        <table className={"table"}>
            <tr>
                <td>
                    <input type={"text"} size={"25"} className={"input-sm"}
                        placeholder={"search"} onChange={onChange} value={props.str}/>
                </td>
            </tr>
        </table>
    )
}

const H=()=>{
    // memo : 호출한것 기억.
    const color = ['red','blue','green','yellow','pink'];
    const no = parseInt(Math.random()*5);
    return(
        <h1 className={"text-center"} style={{"color":color[no]}}>Music Top 50</h1>
    )
}

const H2=React.memo(()=>{
    // memo : 호출한것 기억.
    const color = ['red','blue','green','yellow','pink'];
    const no = parseInt(Math.random()*5);
    return(
        <h1 className={"text-center"} style={{"color":color[no]}}>Music Top 50</h1>
    )
})

export default App3;