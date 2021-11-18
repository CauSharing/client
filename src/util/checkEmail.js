const checkCauEmail = (email) => {
    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@cau.ac.kr$/i;
    return emailRegex.test(email);
}

const checkEmail = (email) => {
    const emailRegex = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;
    return emailRegex.test(email);
}
export {checkCauEmail, checkEmail};