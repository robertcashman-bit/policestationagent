const payload = {
  name: "Test",
  contactNumber: "01732 247427",
  email: "",
  role: "family",
  clientName: "",
  clientDOB: "",
  policeStation: "Medway",
  interviewDate: "2026-02-01",
  interviewTime: "10:00",
  attendanceType: "scheduled-voluntary",
  briefDetails: "Quick test – disregard.",
  supportNeeds: "",
  nonUrgentConfirmation: true,
  consent: true,
};

const url = process.env.CONTACT_TEST_URL || "https://www.policestationagent.com/api/contact";
const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});
const data = await res.json();
console.log("Status:", res.status, res.ok ? "OK" : "FAIL");
console.log("Body:", data);
process.exit(res.ok && data.success ? 0 : 1);
