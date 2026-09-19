const https = require('https');
const teams = ["AEK Athens FC", "LASK", "RC Lens", "AS Roma", "ŠK Slovan Bratislava", "Sabah FC", "Viking FK"];

const fetchLogo = (name) => {
    return new Promise((resolve) => {
        let searchName = name;
        if (name === "AEK Athens FC") searchName = "AEK Athens";
        if (name === "ŠK Slovan Bratislava") searchName = "Slovan Bratislava";
        const url = `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(searchName)}`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.teams && parsed.teams.length > 0) {
                        resolve({ name, url: parsed.teams[0].strBadge });
                    } else {
                        resolve({ name, url: "" });
                    }
                } catch(e) {
                    resolve({ name, url: "" });
                }
            });
        }).on('error', () => resolve({ name, url: "" }));
    });
};

async function main() {
    const results = {};
    for (const t of teams) {
        const res = await fetchLogo(t);
        results[res.name] = res.url;
    }
    console.log(JSON.stringify(results, null, 2));
}
main();
