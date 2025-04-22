const express = require('express');
const app = express();

// Practices
const { 
    sample,
    variable_1,
    variable_2
} = require('./practices');

/* =======================================
*  STRICTLY NO CHATGPT OR CODE GENERATORS 
*  PLEASE ANSWER EACH ITEM WITH ALL YOUR 
*  BEST AND IF YOU HAVE ANY DIFFICULTIES
*  PLEASE INQUIRE YOUR SENIORS OR YOUR
*  COLLEAGUES TO HELP YOU ANALYZE EACH
*  ITEMS. 
* 
*  NO AI CODE GENERATOR PLEASE T_T   
*  =======================================
*/

//Global functions/ the helpers
function capitalize(str) {
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

function formatName(user) {
    return `${capitalize(user.LAST_NAME)}, ${capitalize(user.FIRST_NAME)} ${user.MIDDLE_NAME.charAt(0)}.`;
}

function formatAddress(adr) {
    return `${capitalize(adr.NUMBER)}, 
            ${capitalize(adr.STREET)}, 
            ${capitalize(adr.BARANGAY)}, 
            ${capitalize(adr.CITY)}, 
            ${capitalize(adr.PROVINCE)}, 
            ${adr.REGION === "NCR" ? "NCR" : capitalize(adr.REGION)}`;
}

function getUser(users, position) {
    if (position === 'first') return users[0];
    if (position === 'last') return users[users.length - 1];
    return users[position];
}

function getUserContact(user, index) {
    return user.CONTACT_NUMBERS[index];
}

function getUserAddress(user, position) {
    if (position === 'current') {
        return user.ADDRESS_LIST.find(addr => addr.IS_CURRENT);
    }
    if (position === 'last') return user.ADDRESS_LIST[user.ADDRESS_LIST.length - 1];
    return user.ADDRESS_LIST[position];
}

function formatMembership(membership) {
    return `${membership.MEMBERSHIP_NAME} (${membership.MEMBERSHIP_CODE})`;
}

function getMembersByMembership(users, membershipId) {
    return users.filter(user => user.MEMBERSHIP_ID === membershipId);
}

function getMembership(memberships, id) {
    return memberships.find(membership => membership.MEMBERSHIP_ID === id);
}

function sortUsersByName(users) {
    return [...users].sort((a, b) => {
        const nameA = formatName(a);
        const nameB = formatName(b);
        return nameA.localeCompare(nameB);
    });
}

/*
======================================
SERVER INSTANCE INFORMATION
======================================
*/
/// App information
const APP_HOST = "localhost";
const APP_PORT = 5501;


/*
======================================
NOTE: SAMPLE CODE USE AS REFERENCE ^_^
======================================
*/
/// Print Map
app.get("/",(req,res)=>{
    /// For new line add <br/>
    let displayString = "";
    displayString += `First name: ${sample["FIRST_NAME"]}<br/>`;
    displayString += `Middle name: ${sample.MIDDLE_NAME}<br/>`;
    displayString += `Last name: ${sample.LAST_NAME}<br/>`;
    res.send(displayString);
});


/*
=====================================
[PHASE1]: Practice Starts HERE ^_^
=====================================
*/
// Practice 1
app.get("/p1",(req,res)=>{
    /// For new line add <br/>
    /*
     * Using the [variable_1] variable
     * display the name in this format
     * LAST_NAME, FIRST_NAME MIDDLE INITIAL
     * Each name should only be capitalized on the first character
     * eg(Dela Cruz, Juan B.)
     */

    //old work
   /*let displayString = "";
    
    const firstName = variable_1.FIRST_NAME;
    const lastName = variable_1.LAST_NAME;
    const middleName = variable_1.MIDDLE_NAME;
    
    const formattedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
    const formattedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    const middleInitial = middleName.charAt(0).toUpperCase();
    
    displayString = `${formattedLastName}, ${formattedFirstName} ${middleInitial}.`;
   */
    const var1 = variable_1;
    let displayString = `${formatName(var1)}`;

    //displayString = `${capitalize(variable_1.LAST_NAME)}, ${capitalize(variable_1.FIRST_NAME)} ${variable_1.MIDDLE_NAME.charAt(0)}.`;

    res.send(displayString);
});

// Practice 2: (Display of Strings)
app.get("/p2",(req,res)=>{
    /// For new line add <br/>
    /*
     * Using the [variable_1] variable
     * Display all the [CONTACT_NUMBERS] of the user
     * following this format
     * Name: FIRST_NAME
     * Contact No(#): contact_number
     * 
     * eg:
     * Name: Juan
     * Contact No(1): 099123124123
     * Contact No(2): 099123124123
     * Contact No(3): 099123124123
     */
    let displayString = `Name: ${capitalize(variable_1.FIRST_NAME)}<br/>`;
    for (let i = 0; i < 3; i++) {
        displayString += `Contact No(${i + 1}): ${variable_1.CONTACT_NUMBERS[i]}<br/>`;
    }

    res.send(displayString);
});

// Practice 3: (Display of List of Json Objects)
app.get("/p3",(req,res)=>{
    /// For new line add <br/>
    /*
     * Using the [variable_1] variable
     * Display all the [ADDRESS_LIST] of the user
     * following this format
     * Name: FIRST_NAME
     * Address(1): NUMBER STREET, BARANGAY, CITY, PROVINCE, REGION  
     * 
     * eg:
     * Name: Juan
     * Address(1): Blk 1 Lot 1 Sampaloc Street, Barangay Sample, City of Sample, Province of Sample, Sample Region
     * Address(2): Blk 1 Lot 1 Sampaloc Street, Barangay Sample, City of Sample, Province of Sample, Sample Region
     * Address(3): Blk 1 Lot 1 Sampaloc Street, Barangay Sample, City of Sample, Province of Sample, Sample Region
     * Address(4): Blk 1 Lot 1 Sampaloc Street, Barangay Sample, City of Sample, Province of Sample, Sample Region
     */
    let displayString = `Name: ${capitalize(variable_1.FIRST_NAME)}<br/>`;
    for(let i=0; i<4; i++) {
        displayString += `Address(${i+1}): ${formatAddress(variable_1.ADDRESS_LIST[i])}<br/>`;
    }

    res.send(displayString);
});

// Practice 4: (Accessing list in a map)
app.get("/p4",(req,res)=>{
    /// For new line add <br/>
    /*
     * Using the [variable_2] variable
     * Display the NAME of the first User
     * Display the NAME of the last User
     * Display the NAME of the 3rd User
     * 
     * eg:
     * FIRST USER: Lyle, Alton M.
     * LAST USER: Deandra, Condon B.
     * 3RD USER: Cameron, Samuel D.
     *  
     */
    const users = variable_2.USERS;
    let displayString = "";

    displayString += `FIRST USER: ${formatName(users[0])}<br/>`;
    displayString += `LAST USER: ${formatName(users[users.length - 1])}<br/>`;
    displayString += `3RD USER: ${formatName(users[2])}`;

    res.send(displayString);
});

// Practice 5: (Accessing list in Map in List in Map)
app.get("/p5",(req,res)=>{
    /// For new line add <br/>
    /*
     * Using the [variable_2] variable
     * Display the NAME of the first User with their 1st contact no
     * Display the NAME of the last User with their 2nd contact no
     * Display the NAME of the 3rd User with their last contact no
     * 
     * eg:
     * FIRST USER: Lyle, Alton M. Contact #: 09912312412
     * LAST USER: Deandra, Condon B. Contact #: 09912312412
     * 3RD USER: Cameron, Samuel D. Contact #: 09912312412
     *  
     */
    const users = variable_2.USERS;
    let displayString = "";

    displayString += `FIRST USER: ${formatName(users[0])} Contact #: ${getUserContact(users[0], 0)}<br/>`;
    displayString += `LAST USER: ${formatName(users[users.length - 1])} Contact #: ${getUserContact(users[users.length - 1], 1)}<br/>`;
    displayString += `3RD USER: ${formatName(users[2])} Contact #: ${getUserContact(users[2], users[2].CONTACT_NUMBERS.length - 1)}`;

    res.send(displayString);
});

// Practice 6: (Accessing Map in List In Map In List in Map)
app.get("/p6",(req,res)=>{
    /// For new line add <br/>
    /*
     * Using the [variable_2] variable
     * Display the NAME of the first User with their 1st address
     * Display the NAME of the last User with their 2nd address
     * Display the NAME of the 3rd User with their last address
     * 
     * eg:
     * FIRST USER: Lyle, Alton M. Contact 
     * FIRST USER 1ST ADDRESS: Blk 1 Lot 1 Sample1 Street, Barangay1, City1, Province1, Region1
     * 
     * SECOND USER: Gwyneth, Douglass B. Contact 
     * SECOND USER 2ND ADDRESS: Blk 2 Lot 2 Sample2 Street, Barangay2, City2, Province2, Region2
     * 
     * THIRD USER: Lexus, Stoll A. Contact 
     * THIRD USER LAST ADDRESS: Blk Last Lot Last SampleLast Street, BarangayLast, CityLast, ProvinceLast, RegionLast
     *  
     */
    const users = variable_2.USERS;
    let displayString = "";

    const firstUser = getUser(users, 'first');
    displayString += `FIRST USER: ${formatName(firstUser)}<br/>`;
    displayString += `FIRST USER 1ST ADDRESS: ${formatAddress(getUserAddress(firstUser, 0))}<br/><br/>`;

    const lastUser = getUser(users, 'last');
    displayString += `SECOND USER: ${formatName(lastUser)}<br/>`;
    displayString += `SECOND USER 2ND ADDRESS: ${formatAddress(getUserAddress(lastUser, 1))}<br/><br/>`;

    
    const thirdUser = getUser(users, 2);
    displayString += `THIRD USER: ${formatName(thirdUser)}<br/>`;
    displayString += `THIRD USER LAST ADDRESS: ${formatAddress(getUserAddress(thirdUser, 'last'))}`;

    res.send(displayString);
});

// Practice 7: (Accessing and Find Map in List In Map In List in Map)
app.get("/p7",(req,res)=>{
    /// For new line add <br/>
    /*
     * Using the [variable_2] variable
     * Display the NAME of the first User with their [IS_CURRENT] current address
     * Display the NAME of the last User with their [IS_CURRENT] current address
     * Display the NAME of the 3rd User with their [IS_CURRENT] current address
     * 
     * eg:
     * FIRST USER: Lyle, Alton M. Contact 
     * FIRST USER 1ST ADDRESS: Blk 1 Lot 1 Sample1 Street, Barangay1, City1, Province1, Region1
     * 
     * SECOND USER: Gwyneth, Douglass B. Contact 
     * SECOND USER 2ND ADDRESS: Blk 2 Lot 2 Sample2 Street, Barangay2, City2, Province2, Region2
     * 
     * THIRD USER: Lexus, Stoll A. Contact 
     * THIRD USER LAST ADDRESS: Blk Last Lot Last SampleLast Street, BarangayLast, CityLast, ProvinceLast, RegionLast
     *  
     */
    let displayString = "";
    const users = variable_2.USERS;

    const firstUser = getUser(users, 'first');
    displayString += `FIRST USER: ${formatName(firstUser)}<br/>`;
    displayString += `FIRST USER 1ST ADDRESS: ${formatAddress(getUserAddress(firstUser, 'current'))}<br/><br/>`;

    const lastUser = getUser(users, 'last');
    displayString += `SECOND USER: ${formatName(lastUser)}<br/>`;
    displayString += `SECOND USER 2ND ADDRESS: ${formatAddress(getUserAddress(lastUser, 'current'))}<br/><br/>`;

    const thirdUser = getUser(users, 2);
    displayString += `THIRD USER: ${formatName(thirdUser)}<br/>`;
    displayString += `THIRD USER LAST ADDRESS: ${formatAddress(getUserAddress(thirdUser, 'current'))}<br/><br/>`;
    

    res.send(displayString);
});

/*
=====================================
[PHASE2]: Practice Starts HERE ^_^
=====================================
*/
// Practice 8: (Listing of JSON object and filtering of List of JSON Object)
app.get("/p8",(req,res)=>{
    /// For new line add <br/>
    /*
     * Using the [variable_2] variable
     * Display all the [MEMBERSHIPS] information
     * with their corresponding users and 
     * display NONE if no user is found
     * MEMBERSHIP(1): MEMBERSHIP_NAME (MEMBERSHIP_CODE)
     * USER(1): LAST_NAME, FIRST NAME MI
     * 
     * eg:
     * MEMBERSHIP(1): Membership 1 (MEMBERSHIP_CODE1)
     * USER(1): Samuel, Giordano N.
     * USER(2): Dakota, Destin A.
     * USER(3): Popp, Bingham P.
     * 
     * MEMBERSHIP(2): Membership 2 (MEMBERSHIP_CODE2)
     * USER(1): Lyle, Matheny N.
     * USER(2): Popp, Bingham P.
     * 
     * MEMBERSHIP(3): Membership 3 (MEMBERSHIP_CODE3)
     * NONE
     */
    let displayString = "";
    const memberships = variable_2.MEMBERSHIPS;
    const users = variable_2.USERS;

    memberships.forEach((membership, index) => {
        displayString += `MEMBERSHIP(${index + 1}): ${formatMembership(membership)}<br/>`;
        
        const membersWithThisMembership = getMembersByMembership(users, membership.MEMBERSHIP_ID);

        if (membersWithThisMembership.length === 0) {
            displayString += `NONE<br/><br/>`;
        } else {
            membersWithThisMembership.forEach((user, userIndex) => {
                displayString += `USER(${userIndex + 1}): ${formatName(user)}<br/>`;
            });
            displayString += `<br/>`;
        }
    });

    res.send(displayString);
});

// Practice 9: (Listing of JSON object and filtering and Sorting of List of JSON Object)
app.get("/p9",(req,res)=>{
    /// For new line add <br/>
    /*
     * Using the [variable_2] variable
     * Display all the [MEMBERSHIPS] information
     * with their sorted corresponding users and 
     * display NONE if no user is found
     * MEMBERSHIP(1): MEMBERSHIP_NAME (MEMBERSHIP_CODE)
     * USER(1): LAST_NAME, FIRST NAME MI
     * 
     * eg:
     * MEMBERSHIP(1): Membership 1 (MEMBERSHIP_CODE1)
     * USER(1): Dakota, Destin A.
     * USER(2): Popp, Bingham P.
     * USER(3): Samuel, Giordano N.
     * 
     * MEMBERSHIP(2): Membership 2 (MEMBERSHIP_CODE2)
     * USER(1): Lyle, Matheny N.
     * USER(2): Popp, Bingham P.
     * 
     * MEMBERSHIP(3): Membership 3 (MEMBERSHIP_CODE3)
     * NONE
     */
    let displayString = "";
    const memberships = variable_2.MEMBERSHIPS;
    const users = variable_2.USERS;

    memberships.forEach((membership, index) => {
        displayString += `MEMBERSHIP(${index + 1}): ${formatMembership(membership)}<br/>`;
        
        const membersWithThisMembership = getMembersByMembership(users, membership.MEMBERSHIP_ID);
        const sortedMembers = sortUsersByName(membersWithThisMembership);

        if (sortedMembers.length === 0) {
            displayString += `NONE<br/><br/>`;
        } else {
            sortedMembers.forEach((user, userIndex) => {
                displayString += `USER(${userIndex + 1}): ${formatName(user)}<br/>`;
            });
            displayString += `<br/>`;
        }
    });

    res.send(displayString);
});

// Practice 10: (Listing of JSON object and Sorting of List of JSON Object)
app.get("/p10",(req,res)=>{
    /// For new line add <br/>
    /*
     * Using the [variable_2] variable
     * Display all the [MEMBERSHIPS] information
     * with their sorted corresponding users and their first contact number
     * NOTE: display NONE if no user is found
     * MEMBERSHIP(1): MEMBERSHIP_NAME (MEMBERSHIP_CODE)
     * USER(1): LAST_NAME, FIRST NAME MI
     * 
     * eg:
     * MEMBERSHIP(1): Membership 1 (MEMBERSHIP_CODE1)
     * USER(1): Dakota, Destin A.
     *   > CONTACT #(1): 09912312412
     * USER(2): Popp, Bingham P.
     *   > CONTACT #(1): 09922312412
     * USER(3): Samuel, Giordano N.
     *   > CONTACT #(1): 09932312412
     * 
     * MEMBERSHIP(2): Membership 2 (MEMBERSHIP_CODE2)
     * USER(1): Lyle, Matheny N.
     *   > CONTACT #(1): 09912312412
     * USER(2): Popp, Bingham P.
     *   > CONTACT #(2): 09922312412
     * 
     * MEMBERSHIP(3): Membership 3 (MEMBERSHIP_CODE3)
     * NONE
     */
    let displayString = "";
    const memberships = variable_2.MEMBERSHIPS;
    const users = variable_2.USERS;

    memberships.forEach((membership, index) => {
        displayString += `MEMBERSHIP(${index + 1}): ${formatMembership(membership)}<br/>`;
        
        const membersWithThisMembership = getMembersByMembership(users, membership.MEMBERSHIP_ID);
        const sortedMembers = sortUsersByName(membersWithThisMembership);

        if (sortedMembers.length === 0) {
            displayString += `NONE<br/><br/>`;
        } else {
            sortedMembers.forEach((user, userIndex) => {
                displayString += `USER(${userIndex + 1}): ${formatName(user)}<br/>`;
                displayString += `&nbsp;&nbsp;&nbsp;&nbsp;&gt; CONTACT #(${userIndex + 1}): ${getUserContact(user, 0)}<br/>`;
            });
            displayString += `<br/>`;
        }
    });

    res.send(displayString);
});

// Practice 11: (Listing of JSON object and filtering and Sorting of List of JSON Object)
app.get("/p11",(req,res)=>{
    /// For new line add <br/>
    /*
     * Using the [variable_2] variable
     * Display all the [MEMBERSHIPS] information
     * with their sorted corresponding users and current address
     * NOTE: display NONE if no user is found
     * MEMBERSHIP(1): MEMBERSHIP_NAME (MEMBERSHIP_CODE)
     * USER(1): LAST_NAME, FIRST NAME MI
     * 
     * eg:
     * MEMBERSHIP(1): Membership 1 (MEMBERSHIP_CODE1)
     * USER(1): Dakota, Destin A.
     *   > ADDRESS(1): Blk 1 Lot 1 Sample1 Street, Barangay1, City1, Province1, Region1
     * USER(2): Popp, Bingham P.
     *   > ADDRESS(2): Blk 2 Lot 2 Sample2 Street, Barangay2, City2, Province2, Region2
     * USER(3): Samuel, Giordano N.
     *   > ADDRESS(3): Blk 3 Lot 3 Sample3 Street, Barangay3, City3, Province3, Region3
     * 
     * MEMBERSHIP(2): Membership 2 (MEMBERSHIP_CODE2)
     * USER(1): Lyle, Matheny N.
     *   > ADDRESS(1): Blk 1 Lot 1 Sample1 Street, Barangay1, City1, Province1, Region1
     * USER(3): Popp, Bingham P.
     *   > ADDRESS(2): Blk 2 Lot 2 Sample2 Street, Barangay2, City2, Province2, Region2
     * 
     * MEMBERSHIP(3): Membership 3 (MEMBERSHIP_CODE3)
     * NONE
     */
    let displayString = "";
    const memberships = variable_2.MEMBERSHIPS;
    const users = variable_2.USERS;

    memberships.forEach((membership, index) => {
        displayString += `MEMBERSHIP(${index + 1}): ${formatMembership(membership)}<br/>`;
        
        const membersWithThisMembership = getMembersByMembership(users, membership.MEMBERSHIP_ID);
        const sortedMembers = sortUsersByName(membersWithThisMembership);

        if (sortedMembers.length === 0) {
            displayString += `NONE<br/><br/>`;
        } else {
            sortedMembers.forEach((user, userIndex) => {
                displayString += `USER(${userIndex + 1}): ${formatName(user)}<br/>`;
                displayString += `&nbsp;&nbsp;&nbsp;&nbsp;&gt; ADDRESS #(${userIndex + 1}): ${formatAddress(getUserAddress(user, 'current'))}<br/>`;
            });
            displayString += `<br/>`;
        }
    });

    res.send(displayString);
});

/*
===============================
    APP LISTENER
===============================
*/
app.listen(APP_PORT, APP_HOST, (error)=>{
    if(error != null){
        console.log("CANNOT START APPLICATION: ", error);
    }
    else{
        console.log(`APP STARTED HOST: http://${APP_HOST}:${APP_PORT}`);
    }
});