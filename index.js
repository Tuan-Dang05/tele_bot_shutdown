const { Telegraf } = require('telegraf')
const { exec } = require('child_process');

const BOT_TOKEN = 'TOKEN_TELEGRAM' // điền token tele vào đây

const bot = new Telegraf(BOT_TOKEN)
bot.start((ctx) => ctx.reply('Xin chào tuan_dang'))
bot.command('shutdown', (ctx) => {
    const time = 5

    // shutdown in [time] seconds
    const cmd = `shutdown -s -f -t ${time}`

    exec(cmd, (error) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
    });

    if (time > 0) {
        let countdown = time; // Khởi tạo biến countdown với giá trị ban đầu là 5

        function displayCountdown() {
            if (countdown > 0) {
                ctx.reply(`Máy tính sẽ tắt sau ${countdown} giây.`);
                setTimeout(displayCountdown, 1000); // Gọi lại hàm displayCountdown sau mỗi 1 giây
                countdown--; // Giảm giá trị countdown sau mỗi lần hiển thị
            } else {
                ctx.reply('Tắt máy tính thành công'); // Hiển thị thông báo "Tắt máy tính thành công" khi countdown kết thúc
            }
        }
        displayCountdown(); // Bắt đầu đếm ngược

    } else {
        ctx.reply('Máy tính sẽ tắt ngay lập tức.')
    }
})
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

console.log('Bot started')
