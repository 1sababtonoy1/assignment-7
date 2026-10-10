import { connection } from "next/server";

// আজকের তারিখ প্রতি রিকোয়েস্টে হিসাব হয়, তাই প্রি-রেন্ডারের সময় এটি আটকে থাকে না
const CurrentDate = async () => {
    // রিকোয়েস্টের সময় পর্যন্ত অপেক্ষা করে, এরপর new Date() নিরাপদ
    await connection();

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
        // সার্ভার UTC-তে চললেও যেন বাংলাদেশের তারিখ দেখায়
        timeZone: "Asia/Dhaka",
    });

    return <>{date}</>;
};

export default CurrentDate;