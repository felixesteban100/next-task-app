import { AnimatedTestimonials } from "@/components/acernity-ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
    const testimonialsGod = [
        {
            focusTheme: "God",
            bibleVerse: "Matthew 5:8 – 'Blessed are the pure in heart, for they shall see God.'",
            quote: "Lust dims my love for God; I will guard my heart and honor Him.",
            src: "https://www.dbackdrop.com/cdn/shop/products/D1050-1.jpg?v=1673495873",
        },
        {
            focusTheme: "God",
            bibleVerse: "Colossians 3:2 – 'Set your minds on things that are above, not on things that are on earth.'",
            quote: "My mind belongs to God, not to the corruption of the world.",
            src: "https://t3.ftcdn.net/jpg/05/54/39/50/360_F_554395094_D4zOhvLOkvVt5OaWq8dUhqcHDDS87ltG.jpg",
        },
        {
            focusTheme: "God",
            bibleVerse: "Romans 12:1 – 'I appeal to you therefore, brothers, by the mercies of God, to present your bodies as a living sacrifice, holy and acceptable to God, which is your spiritual worship.'",
            quote: "Every moment of purity is an act of worship to God.",
            src: "https://t3.ftcdn.net/jpg/01/94/11/30/360_F_194113074_rZ1a8I9TrRY9LCWLdlyvl2UiKlqOalPH.jpg",
        },
        {
            focusTheme: "God",
            bibleVerse: "2 Timothy 2:22 – 'So flee youthful passions and pursue righteousness, faith, love, and peace, along with those who call on the Lord from a pure heart.'",
            quote: "I will not fight temptation; I will flee from it.",
            src: "https://historyuk.s3.eu-west-2.amazonaws.com/s3fs-public/2023-03/shutterstock_1909472887-min.jpg",
        }
    ];

    const testimonialsFamily = [
        {
            focusTheme: "My Family",
            bibleVerse: "Proverbs 5:15-16 – 'Drink water from your own cistern, flowing water from your own well.'",
            quote: "I choose to remain faithful in mind, heart, and body for my family.",
            src: "https://scontent-bos5-1.xx.fbcdn.net/v/t1.6435-9/80976434_1481365278693682_987932199946813440_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=vKwrHIOLLNEQ7kNvgFDm_w0&_nc_oc=AdmFhGNiSnsoaY84p3_nEyibMRDBKSwM6kJSKiMFC_YTm671wyQrFZpJIrRHXB1SUXt5KX0P5Gvtskr7kZ0Ow4FH&_nc_zt=23&_nc_ht=scontent-bos5-1.xx&_nc_gid=cKZTFFkwwAh7OwQtQvvB0g&oh=00_AYFJxqfKWEvSvS4KIOoYX1Cv6WJjCmQQAIQWWNav53al3w&oe=68026426",
        },
        {
            focusTheme: "My Family",
            bibleVerse: "1 Peter 5:8 – 'Be sober-minded; be watchful. Your adversary the devil prowls around like a roaring lion, seeking someone to devour.'",
            quote: "Satan wants to destroy my family; I will not give him an open door.",
            src: "https://scontent-bos5-1.xx.fbcdn.net/v/t39.30808-6/317916221_2363389450491256_6130071076831361264_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=IEBYcWHyEAUQ7kNvgGs4k-d&_nc_oc=AdkM758L-7qBmkHFNhpfue7OwUJ3BBPPAOEDWOlGSAgWseDthsWybT478X4-vj-PVOAi3XqahiLdPrpW6nEK7emi&_nc_zt=23&_nc_ht=scontent-bos5-1.xx&_nc_gid=x_T3WpOyJR3jcND1H3gRnw&oh=00_AYFgwxzzvtQwubEWILCw5btGAhSUezAcgubB42n_gdmQaA&oe=67E0C65A",
        },
        {
            focusTheme: "My Family",
            bibleVerse: "Hebrews 12:1 – 'Therefore, since we are surrounded by so great a cloud of witnesses, let us also lay aside every weight, and sin which clings so closely, and let us run with endurance the race that is set before us.'",
            quote: "This sin is a chain holding me back from my dreams. My grandmother needs me to be strong.",
            src: "https://media-bos5-1.cdn.whatsapp.net/v/t61.24694-24/425140452_919851329845211_7601762434203967936_n.jpg?ccb=11-4&oh=01_Q5AaISKInp4QLmhz3_bedLVLo2W4yc0_nZ7YFAtNo2naXl5h&oe=67E81D25&_nc_sid=5e03e0&_nc_cat=102"
        },
        {
            focusTheme: "My Family",
            bibleVerse: "Ephesians 5:25 – 'Husbands, love your wives, as Christ loved the church and gave himself up for her.'",
            quote: "True love is sacrifice, not selfish desire.",
            src: "https://scontent-bos5-1.xx.fbcdn.net/v/t39.30808-6/480794267_2985321704964691_5009842528868479282_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=k11A3qksqgYQ7kNvgGwsMS2&_nc_oc=Adk4g24U2LxCIrxkP9sd6vMqrhY317gdnEZlVbnVwixYmY61OehxAvLG6rJYEuIUbYkxoAr1hG5cuCi3HY3DiElp&_nc_zt=23&_nc_ht=scontent-bos5-1.xx&_nc_gid=49R44U-foBt1mYl2xkiaLg&oh=00_AYGC80vPbj-jJ6OUf7xXkRJC0Td-wLE_208_cBBeAe6CnQ&oe=67E0CAA4",
        }
    ]

    const testimonialsFuture = [
        {
            focusTheme: "My Future",
            bibleVerse: "Proverbs 14:12 – 'There is a way that seems right to a man, but its end is the way to death.'",
            quote: "A moment of sin can lead to a lifetime of consequences.",
            src: "https://scontent-bos5-1.xx.fbcdn.net/v/t1.6435-9/43680101_1145584718938408_7772744079556739072_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=WrE-qI17EHkQ7kNvgE_IjSP&_nc_oc=Adl1i3eZT36eyj8C5w1xORE19u9fDXOusXgUsbEEkIhU7e9Ok9RTDzZTd7pUiWBV3hFlhB_Ce8ioGnET2cLWmhWh&_nc_zt=23&_nc_ht=scontent-bos5-1.xx&_nc_gid=T3n_5azoUmQ3iGxlQPwgPQ&oh=00_AYHf2LIRckeAtb4-S13KxY60IVMTkgiXLvb2C7w9O_xNsg&oe=6802617F",
        },
        {
            focusTheme: "My Future",
            bibleVerse: "Romans 13:14 – 'But put on the Lord Jesus Christ, and make no provision for the flesh, to gratify its desires.'",
            quote: "I will not feed my flesh; I will strengthen my spirit.",
            src: "https://scontent-bos5-1.xx.fbcdn.net/v/t1.6435-9/44877100_1145487295614817_77590014426349568_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=sU8cPF5N9X0Q7kNvgG1Ttdb&_nc_oc=Adk8094P7pFo-APB39_ZZ16AKK1en4l9r08BdAga9y09YpQ4L5uLiJYulSmo8ncXstRF4DesBP9ilctwmag3Xs46&_nc_zt=23&_nc_ht=scontent-bos5-1.xx&_nc_gid=L6UZWuHoEc68XPrgX8949A&oh=00_AYE4Rl_b3CNgi3RfcuXt96U759tX5SNQD4oRv_oS10lMew&oe=68025002",
        },
        {
            focusTheme: "My Future",
            bibleVerse: "Philippians 4:8 – 'Finally, brothers, whatever is true, whatever is honorable, whatever is just, whatever is pure, whatever is lovely, whatever is commendable, if there is any excellence, if there is anything worthy of praise, think about these things.'",
            quote: "The battle is won or lost in the mind—I choose purity.",
            src: "https://scontent-bos5-1.xx.fbcdn.net/v/t1.6435-9/71706824_1394218094075068_4242365233798053888_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=GcJOPgHmVowQ7kNvgGtT9TA&_nc_oc=Adlp4BRrlhMPda5muavYYMLjkSw048dkfwD8_6go1hym28lZo7hefsmb6bFo7Fyc05NbCM9o6gTWzCdWGGgON4nX&_nc_zt=23&_nc_ht=scontent-bos5-1.xx&_nc_gid=sMpKfvr84upGV4vRlyevrg&oh=00_AYF0bU_cLXNkW9-PDlTo1GqR-o0fHQuscV1yea0-PsWkfA&oe=6802547F",
        },
        {
            focusTheme: "My Future",
            bibleVerse: "James 1:12 – 'Blessed is the man who remains steadfast under trial, for when he has stood the test he will receive the crown of life, which God has promised to those who love him.'",
            quote: "Victory over temptation brings eternal rewards.",
            src: "https://scontent-bos5-1.xx.fbcdn.net/v/t1.6435-9/54435599_1244447309052148_3771102592944308224_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=KOWPXGEBrH0Q7kNvgF98zz3&_nc_oc=AdmkddbJKUbEWHmL3CwIL7lCvAMlccomabZXJidQcewrCblOznl5wUqPFaQ8w3IYul2TuBp-xCJ9Sr5345TLzF-q&_nc_zt=23&_nc_ht=scontent-bos5-1.xx&_nc_gid=Y9SA5je8qtrBVU2uF_QxhA&oh=00_AYFXWgRBb7w8xmOYP145Qd7KrjrXDc7dCM53cto0FxdoWw&oe=68024EDF",
        },
        {
            focusTheme: "My Future",
            bibleVerse: "Galatians 6:9 – 'And let us not grow weary of doing good, for in due season we will reap, if we do not give up.'",
            quote: "I’ve been fighting this battle since I was 13. A decade of struggle will not define me—my victory will.",
            src: "https://yykak7svby.ufs.sh/f/lVsxh5PLVTj9n0G5TvhJqKC61hLa92zGwTr5vE8dUejxyJcM",
        },

    ]

    return (
        <div className="flex flex-col justify-start items-start w-full gap-2">
            <AnimatedTestimonials indexTestimonial={1} testimonials={testimonialsGod} autoplay={true} />
            <AnimatedTestimonials indexTestimonial={2} testimonials={testimonialsFamily} autoplay={true} />
            <AnimatedTestimonials indexTestimonial={3} testimonials={testimonialsFuture} autoplay={true} />
        </div>
    );
}
