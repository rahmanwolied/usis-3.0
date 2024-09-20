import parse from 'node-html-parser';

export const formatAdvisedCourses = (advisedCoursesRes: string) => {
    const root = parse(advisedCoursesRes);
    const table = root.getElementsByTagName('table')[0];
    const rows = table.querySelectorAll('tr');
    rows.shift();
    const advisedCourseRows = rows.map((row) => {
        const columns = row.querySelectorAll('td');
        return {
            code: columns[0].text.trim(),
            title: columns[1].text.trim(),
            section: columns[2].text.trim(),
            faculty: columns[3].text.trim(),
            credit: columns[4].text.trim(),
        };
    });
    return advisedCourseRows;
};

export const formatGradesheet = (gradesheetRes: string) => {
    /*
    courseCode: String,
            courseTitle: String,
            grade: String,
            gradePoint: Number,
    */
    const root = parse(gradesheetRes);
    const table = root.querySelector('.previous-result-table');
    const rows = table!.querySelectorAll('tr');
    rows.shift();

    const courseRows = rows.filter((row) => {
        console.log(typeof row.getAttribute('style'));
        if (typeof row.getAttribute('style') === 'undefined') return true;
    });

    console.log('courseRopws', courseRows);

    const courses = courseRows.map((row) => {
        const columns = row.querySelectorAll('td');
        return {
            courseCode: columns[0].text.trim(),
            courseTitle: columns[1].text.trim(),
            credit: columns[2].text.trim(),
            creditEarned: columns[3].text.trim(),
            grade: columns[4].text.trim(),
            gradePoint: columns[5].text.trim(),
        };
    });
    return courses;
};

export const formatProfile = (profileRes: string) => {
    const returnObj = {
        program: '',
        studentId: '',
        bloodGroup: '',
        mobile: '',
        homePhone: '',
    };
    const root = parse(profileRes);
    const programDiv = root.querySelector('.element-input-value-program');
    const program = programDiv?.text.trim().split(':')[1].trim();
    returnObj.program = program ?? '';
    const fieldNames = root.querySelectorAll('.element-title-name');
    const fieldValues = root.querySelectorAll('.element-input-value');

    fieldNames.forEach((field, index) => {
        const fieldName = field.text.trim();
        const fieldValue = fieldValues[index].text.trim();
        switch (fieldName) {
            case 'Student ID:':
                returnObj.studentId = fieldValue;
                break;
            case 'Blood Group:':
                returnObj.bloodGroup = fieldValue;
                break;
            case 'Mobile Number:':
                returnObj.mobile = fieldValue;
                break;
            case 'Home Phone:':
                returnObj.homePhone = fieldValue;
                break;
        }
    });

    return returnObj;
};
