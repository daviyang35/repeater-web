import qs from "qs";

// 获取出生日期到目前的年龄
const getAgeByBirthday = (strBirthday: string) => {
    let returnAge: number = 0,
        strBirthdayArr = strBirthday.split("-"),
        birthYear = Number(strBirthdayArr[0]),
        birthMonth = Number(strBirthdayArr[1]),
        birthDay = Number(strBirthdayArr[2]);

    const d = new Date(),
        nowYear = d.getFullYear(),
        nowMonth = d.getMonth() + 1,
        nowDay = d.getDate();
    if (nowYear === birthYear) {
        returnAge = 0;
    } else {
        var ageDiff = nowYear - birthYear;
        if (ageDiff > 0) {
            if (nowMonth === birthMonth) {
                var dayDiff = nowDay - birthDay;
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            } else {
                var monthDiff = nowMonth - birthMonth;
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            }
        } else {
            returnAge = -1;
        }
    }
    return returnAge;
};

// 获取身份证信息
const getInfoByIdNumber = (idnum: string) => {
    const REGEX_IDNUMBER = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

    if (!REGEX_IDNUMBER.test(idnum)) {
        return false;
    }
    const year = idnum.substring(6, 10);
    const month = idnum.substring(10, 12);
    const day = idnum.substring(12, 14);
    return {
        year,
        month,
        day,
        birthday: `${year}-${month}-${day}`,
        sex: +idnum.substring(16, 17) % 2 === 0 ? 2 : 1, // 2是女 1是男
    };
};

// 获取是否是重庆
const getIsCq = () => {
    const {search} = window.location;
    const query: any = qs.parse(search.split("?")[1]);
    if (query.yhdh && query.bmdm) {
        return true;
    }
    return false;
};

export {getAgeByBirthday, getInfoByIdNumber, getIsCq};
