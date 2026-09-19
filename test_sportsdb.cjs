const https = require('https');
https.get('https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=Arsenal', (res) => {
    let data = '';
    res.on('data', c => data+=c);
    res.on('end', () => {
        try {
            const parsed = JSON.parse(data);
            console.log(parsed.player ? parsed.player.length : 'No players');
            if(parsed.player) {
                console.log(parsed.player[0].strPlayer, parsed.player[0].strPosition);
            }
        } catch(e) { console.log(e.message); }
    });
});
