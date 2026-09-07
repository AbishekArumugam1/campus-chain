import { ethers } from "https://esm.sh/ethers@6";

// ==========================================
// PUT YOUR DEPLOYED CONTRACT ADDRESS HERE
// ==========================================

const CONTRACT_ADDRESS = "0x76af8d67f25350e2b6163ca8b4f1b10682a1e153";

// ==========================================
// CONTRACT ABI
// ==========================================

const ABI = [
    "function admin() view returns (address)",
    "function totalStudents() view returns (uint256)",

    "function addStudent(uint256 _rollNo, string _name, string _department, uint256 _year)",

    "function getStudent(uint256 _rollNo) view returns (uint256, string, string, uint256, uint256, bool)",

    "function updateStudent(uint256 _rollNo, string _name, string _department, uint256 _year)",

    "function markAttendance(uint256 _rollNo, uint256 _attendance)",

    "function updateFees(uint256 _rollNo, bool _status)",

    "function deleteStudent(uint256 _rollNo)",

    "function getStudentIds() view returns (uint256[])",

    "function getDashboardStats() view returns (uint256 total, uint256 feesPaidCount)"
];

// ==========================================
// VARIABLES
// ==========================================

let provider;
let signer;
let contract;

// ==========================================
// CONNECT WALLET
// ==========================================

document
    .getElementById("connectBtn")
    .addEventListener("click", connectWallet);

async function connectWallet() {

    if (typeof window.ethereum === "undefined") {
        alert("MetaMask is not installed!");
        return;
    }

    try {

        provider = new ethers.BrowserProvider(window.ethereum);

        await provider.send("eth_requestAccounts", []);

        signer = await provider.getSigner();

        const address = await signer.getAddress();

        contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            ABI,
            signer
        );
       
        document.getElementById("connectBtn").innerText =
            address.substring(0, 6) +
            "..." +
            address.substring(address.length - 4);

        alert("Wallet Connected Successfully!");

        await loadDashboard();

    } catch (error) {

        console.error(error);

        alert(
            "Connection failed: " +
            (error.reason || error.message)
        );
    }
}

// ==========================================
// ADD STUDENT
// ==========================================

window.addStudent = async function () {

    try {

        if (!contract) {
            alert("Please connect MetaMask first!");
            return;
        }

        const roll = document
            .getElementById("rollNo")
            .value;

        const name = document
            .getElementById("name")
            .value;

        const dept = document
            .getElementById("department")
            .value;

        const year = document
            .getElementById("year")
            .value;

        if (!roll || !name || !dept || !year) {
            alert("Please fill all fields!");
            return;
        }

        const tx = await contract.addStudent(
            roll,
            name,
            dept,
            year
        );

        alert("Transaction sent. Please confirm in MetaMask.");

        await tx.wait();

        alert("Student added successfully!");

        document.getElementById("rollNo").value = "";
        document.getElementById("name").value = "";
        document.getElementById("department").value = "";
        document.getElementById("year").value = "";

        await loadDashboard();

    } catch (error) {

        console.error(error);

        alert(
            "Error adding student: " +
            (error.reason || error.message)
        );
    }
};

// ==========================================
// LOAD DASHBOARD
// ==========================================

async function loadDashboard() {

    if (!contract) return;

    try {

        const stats =
            await contract.getDashboardStats();

        document.getElementById("totalStudents").innerText =
            stats[0].toString();

        document.getElementById("feesPaid").innerText =
            stats[1].toString();

        await loadStudents();

    } catch (error) {

        console.error("Dashboard error:", error);
    }
}

// ==========================================
// LOAD STUDENTS
// ==========================================

async function loadStudents() {

    try {

        const ids =
            await contract.getStudentIds();

        const table =
            document.getElementById("studentTable");

        table.innerHTML = "";

        for (let i = 0; i < ids.length; i++) {

            try {

                const s =
                    await contract.getStudent(ids[i]);

                table.innerHTML += `
                    <tr>

                        <td>${s[0].toString()}</td>

                        <td>${s[1]}</td>

                        <td>${s[2]}</td>

                        <td>${s[3].toString()}</td>

                        <td>${s[4].toString()}%</td>

                        <td>
                            ${s[5] ? "Paid" : "Pending"}
                        </td>

                        <td>

                            <button
                                class="action-btn att"
                                onclick="markAttendance(${s[0]})">
                                Attendance
                            </button>

                            <button
                                class="action-btn fee"
                                onclick="updateFees(${s[0]})">
                                Fees
                            </button>

                            <button
                                class="action-btn del"
                                onclick="deleteStudent(${s[0]})">
                                Delete
                            </button>

                        </td>

                    </tr>
                `;

            } catch (error) {

                console.log(
                    "Could not load student:",
                    ids[i].toString()
                );
            }
        }

    } catch (error) {

        console.error("Student loading error:", error);
    }
}

// ==========================================
// MARK ATTENDANCE
// ==========================================

window.markAttendance = async function (id) {

    try {

        const att =
            prompt("Enter Attendance Percentage:");

        if (att === null) return;

        if (att < 0 || att > 100) {
            alert("Attendance must be between 0 and 100.");
            return;
        }

        const tx =
            await contract.markAttendance(
                id,
                att
            );

        await tx.wait();

        alert("Attendance updated!");

        await loadDashboard();

    } catch (error) {

        console.error(error);

        alert(
            "Error: " +
            (error.reason || error.message)
        );
    }
};

// ==========================================
// UPDATE FEES
// ==========================================

window.updateFees = async function (id) {

    try {

        const tx =
            await contract.updateFees(
                id,
                true
            );

        await tx.wait();

        alert("Fees marked as Paid!");

        await loadDashboard();

    } catch (error) {

        console.error(error);

        alert(
            "Error: " +
            (error.reason || error.message)
        );
    }
};

// ==========================================
// DELETE STUDENT
// ==========================================

window.deleteStudent = async function (id) {

    try {

        const confirmDelete =
            confirm(
                "Are you sure you want to delete this student?"
            );

        if (!confirmDelete) return;

        const tx =
            await contract.deleteStudent(id);

        await tx.wait();

        alert("Student deleted!");

        await loadDashboard();

    } catch (error) {

        console.error(error);

        alert(
            "Error: " +
            (error.reason || error.message)
        );
    }
};