const checkCauEmail = (email) => {
    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@cau.ac.kr$/i;
    return emailRegex.test(email);
}

export default checkCauEmail;