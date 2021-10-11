import axios from "axios";

export function signIn({email, password, setEmail, setPassword}){
    const data = {
        email: email,
        password: password
    };

    let token = null;

    axios.post('http://3.37.167.224:8080/api/login',data)
        .then(res => {
            // 토큰 받기
            if(res.data === "잘못된 아이디 혹은 비밀번호 입니다.")
            {
                console.log("잘못됨");
                setEmail("");
                setPassword("");
            }
            else
                console.log("로그인됨");
                token = res.data;
                setEmail(email);
                setPassword(password);
            })
        .catch(err =>{
            console.log(err.data);
            setEmail("");
            setPassword("");
            })

    return token;
}
