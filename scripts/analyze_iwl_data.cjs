const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'iwl_submissions_dump.json');
const rawData = fs.readFileSync(dataPath, 'utf-8');
const submissions = JSON.parse(rawData);

let v1Total = 0, v1Complete = 0, v1Plan299 = 0, v1Plan499 = 0;
let v2Total = 0, v2Complete = 0, v2Plan299 = 0, v2Plan499 = 0;

let dropoffs = 0;

submissions.forEach(sub => {
    // V2 submissions have "v2" in their orderId
    const isV2 = sub.orderId && sub.orderId.toLowerCase().includes('v2');
    const isComplete = sub.status === 'full_submission' || sub.status === 'complete';
    const plan = sub.plan || 299; // Assume 299 if not explicitly 499

    if (!isComplete) dropoffs++;

    if (isV2) {
        v2Total++;
        if (isComplete) v2Complete++;
        if (plan == 299) v2Plan299++;
        if (plan == 499) v2Plan499++;
    } else {
        v1Total++;
        if (isComplete) v1Complete++;
        if (plan == 299) v1Plan299++;
        if (plan == 499) v1Plan499++;
    }
});

const v1CompletionRate = (v1Complete / v1Total) * 100;
const v2CompletionRate = (v2Complete / v2Total) * 100;

console.log('\\n=========================================');
console.log('       IWL SUBMISSION INSIGHTS           ');
console.log('=========================================');
console.log(`\nTotal Submissions across all versions: ${submissions.length}`);
console.log(`Total Drop-offs (Incomplete): ${dropoffs} (${((dropoffs / submissions.length) * 100).toFixed(1)}%)`);

console.log('\n--- V1 (Main Link) Performance ---');
console.log(`Total V1 Entries: ${v1Total}`);
console.log(`V1 Completion Rate: ${v1CompletionRate.toFixed(1)}% (${v1Complete}/${v1Total})`);
console.log(`Plan Breakdown: ₹299 (${v1Plan299}), ₹499 (${v1Plan499})`);
console.log(`Premium Upgrade Rate: ${((v1Plan499 / v1Total) * 100).toFixed(1)}%`);

console.log('\n--- V2 (New Link) Performance ---');
console.log(`Total V2 Entries: ${v2Total}`);
console.log(`V2 Completion Rate: ${v2CompletionRate.toFixed(1)}% (${v2Complete}/${v2Total})`);
console.log(`Plan Breakdown: ₹299 (${v2Plan299}), ₹499 (${v2Plan499})`);
console.log(`Premium Upgrade Rate: ${((v2Plan499 / v2Total) * 100).toFixed(1)}%`);

console.log('\n=========================================');
