var logger = (()=>{

    var fs=require('fs');
    var filePath = __dirname+'/logs.txt';

    function getCurrentTimeStamp(){
        let date=new Date();
        return `[${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}]`;
    }

    return {
        log: function(message){
            let currentTimeStamp = getCurrentTimeStamp();
            let displayMessage = `${currentTimeStamp} ${message}\r\n`;

            console.log(displayMessage);
            fs.appendFile(filePath,displayMessage,{flag:'a+'},err=>{});
        }
    }
})();

class Doctor {
    constructor(firstName, lastName, speciality) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.speciality = speciality;
        this.listOfPatients = {};
        this.scheduledLabTests = {};

        logger.log(`Dr. ${firstName} created`);
    }

    #longRunningTask(doctor,patient,test) {
        return new Promise((resolve,reject)=> {
            logger.log(`Dr. ${doctor.firstName} started ${test.name} on patient ${patient.firstName}`);
            setTimeout(() => {
                logger.log(`Dr. ${doctor.firstName} finished ${test.name} on patient ${patient.firstName}`);
                resolve();
            }, 1000)
        });
    }

    addPatient(patient) {
        if (!patient.ucId in this.listOfPatients) {
            this.listOfPatients[ucId] = patient;
        }
    }

    getPatient(ucId) {
        if (ucId in this.listOfPatients) {
            return this.listOfPatients[ucId];
        }
    }

    scheduleLabTest(patient, labTest) {
        if (!(patient.ucId in this.scheduledLabTests)) {
            this.scheduledLabTests[patient.ucId] = [];
        }

        this.scheduledLabTests[patient.ucId].push(labTest);
    }

    async doLabTests(patient) {
        return new Promise(async (resolve, reject)=>{

        let allTests = this.scheduledLabTests[patient.ucId];
        let allPromises=[];

        while (allTests.length > 0) {
            let test = allTests.shift();
            let tests=[];
            allPromises.push(await this.#longRunningTask(this,patient,test));

            if (test instanceof BloodPressureTest) {
                test.setLowerLimit=80;
                test.setUpperLimit=120;
                test.setPulse=100;
            }

            if (test instanceof BloodSugarTest) {
                let today = new Date();
                //let yesterday = today.setDate(today.getDate()-1);
                let yesterday = new Date(today.getFullYear(),today.getMonth(),today.getDate()-1,9,10);
                test.setValue=7;
                test.setLastMealTime = yesterday;
            }

            if (test instanceof BloodCholesterolTest) {
                let today = new Date();
                //let yesterday = today.setDate(today.getDate()-1);
                let yesterday = new Date(today.getFullYear(),today.getMonth(),today.getDate()-1,9,10);
                test.setValue=3;
                test.setLastMealTime = yesterday;
            }

            patient.addCompletedTest=test;
        }

        Promise.all(allPromises).then((results)=>{
            resolve();
        });
    });
}}

class Patient {
    constructor(firstName, lastName, ucId, cardNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.ucId = ucId;
        this.cardNumber = cardNumber;
        this.doctor = null;
        this.completedLabTests = [];

        logger.log(`Patient ${firstName} created`);
    }

    set chooseDoctor(doctor) {
        this.doctor = doctor;
        doctor.addPatient(this);
        logger.log(`Patient ${this.firstName} choose ${doctor.firstName} as his primary doctor`);
    }

    set addCompletedTest(test){
        this.completedLabTests.push(test);
    }

    doLabTests() {
        if(this.doctor!=null){
            this.doctor.doLabTests(this);
        }
    }
}

class LabTest {

    constructor(name) {
        let dateTime = new Date();
        this.date = dateTime.toLocaleDateString();
        this.time = dateTime.toLocaleTimeString();
        this.name = name;
    }
}

class BloodPressureTest extends LabTest {
    constructor() {
        super("Blood pressure test");
    }

    set setLowerLimit(lowerLimit) {
        this.lowerLimit = lowerLimit;
    }
    set setUpperLimit(upperLimit) {
        this.upperLimit = upperLimit;
    }
    set setPulse(pulse) {
        this.pulse = pulse;
    }
}

class BloodSugarTest extends LabTest {
    constructor() {
        super("Blood sugar test");
    }

    set setValue(value) {
        this.value = value;
    }
    set setLastMealTime(time) {
        this.lastMealTime = time;
    }
}

class BloodCholesterolTest extends LabTest {
    constructor() {
        super("Blood cholesterol test");
    }

    set setValue(value) {
        this.value = value;
    }
    set setLastMealTime(time) {
        this.lastMealTime = time;
    }
}

let doctorMilan = new Doctor('Milan', 'Djukic', 'Dermatology');
let patientDragan = new Patient('Dragan', 'Peric', '1234567891234', '234567');

patientDragan.chooseDoctor = doctorMilan;

doctorMilan.scheduleLabTest(patientDragan, new BloodPressureTest());
doctorMilan.scheduleLabTest(patientDragan, new BloodSugarTest());


doctorMilan.doLabTests(patientDragan).then((message)=>{
    //when all tests are finished, continue here
    console.log(`Lab results for patient ${patientDragan.firstName}:`);
    console.log(`===================================================\r\n`)
    patientDragan.completedLabTests.forEach(test=>{
        console.log(test);
    })
});

//TODO: ispravi last meal time datum