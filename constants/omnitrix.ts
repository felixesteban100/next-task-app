import { Alien } from "../types";

//https://www.google.com/search?q=all+ben+10+aliens+first+appearance&client=opera-gx&hs=awI&bih=927&biw=970&hl=en&sxsrf=AB5stBjj-1S2HzAALrtoDaEEh2lrLLrRWA%3A1690040313472&ei=-fe7ZLqxHIPj5NoPlIqosAg&oq=all+ben+10+aliens+first+&gs_lp=Egxnd3Mtd2l6LXNlcnAiGGFsbCBiZW4gMTAgYWxpZW5zIGZpcnN0ICoCCAAyBRAhGKABSIxYUMEdWPRNcAF4AZABAJgB-gGgAdcNqgEGMS4xMS4xuAEDyAEA-AEBwgIKEAAYRxjWBBiwA8ICBxAjGIoFGCfCAggQABiKBRiRAsICBRAAGIAEwgIFEC4YgATCAgcQIxiwAhgnwgIHEAAYDRiABMICBxAuGA0YgATCAgYQABgHGB7CAgcQABiKBRhDwgIKEAAYgAQYFBiHAsICBhAAGBYYHsICCBAAGIoFGIYD4gMEGAAgQYgGAZAGCA&sclient=gws-wiz-serp

export const ALL_ALIENS_OMNIVERSE: Alien[] = [
    // ORIGINAL -----------------------------------------------------------------------
    {
        name: 'Wildmutt',
        img: '/aliens/omniverse/Wildmutt.png',
        height: {
            silouette: 'h-[10rem] lg:h-[15rem]',
            character: 'h-[20rem] lg:h-[30rem] ml-[1rem] mt-[10rem] lg:mt-[5rem]'
        },
        color: 'orange',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1763003969/wildmutt-unscreen_b96bwr.gif"
    },
    {
        name: 'fourArms',
        img: '/aliens/omniverse/fourArms.png',
        color: 'red',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1761187833/four-arms-unscreen_dntxfr.gif"
    },
    {
        name: 'GreyMatter',
        img: '/aliens/omniverse/GreyMatter.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        },
        color: 'gray',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1761400981/greymatter-unscreen_ic0rtp.gif"
    },
    {
        name: 'XLR8',
        img: '/aliens/omniverse/XLR8.png',
        height: {
            silouette: 'h-[10rem] lg:h-[14rem]',
            character: 'h-[20rem] lg:h-[30rem] mt-[10rem] lg:mt-[8rem]'
        },
        color: 'blue',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1763004897/xlr8-unscreen_ebdjjy.gif"
    },
    {
        name: 'Upgrade',
        img: '/aliens/omniverse/Upgrade.png',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762920731/upgrade-unscreen_pypssq.gif"
    },
    {
        name: 'Diamondhead',
        img: '/aliens/omniverse/Diamondhead.png',
        color: 'cyan',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1760914128/diamondhead-unscreen_ws7kk1.gif"
    },
    {
        name: 'Ripjaws',
        img: '/aliens/omniverse/Ripjaws.png',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762744393/ripjaws-unscreen_cyeghl.gif"
    },
    {
        name: 'Stinkfly',
        img: '/aliens/omniverse/Stinkfly.png',
        height: {
            silouette: 'h-[10rem] lg:h-[14rem]',
            character: 'h-[35rem] lg:h-[45rem] -mt-[5rem] lg:-mt-[8rem]'
        },
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762786746/stickfly-unscreen_vuskb9.gif"
    },
    {
        name: 'Ghostfreak',
        img: '/aliens/omniverse/Ghostfreak.png',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1761230607/ghostfreak-unscreen_vrj6hn.gif"
    },
    {
        name: 'Heatblast',
        img: '/aliens/omniverse/heatblast.png',
        color: 'yellow',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762352468/heatblast-unscreen_caddjm.gif"
    },
    {
        name: 'Cannonbolt',
        img: '/aliens/omniverse/Cannonbolt.png',
        color: 'yellow',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1760796459/cannonbolt-unscreen_rek6t7.gif"
        // video: "https://res.cloudinary.com/dun283iki/image/upload/l_image:cannonbolt-unscreen_rek6t7,e_reverse/fl_layer_apply/v1760796459/cannonbolt-unscreen_rek6t7.gif"
    },
    {
        name: 'Wildvine',
        img: '/aliens/omniverse/Wildvine.png',
        color: 'lime',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1763004538/wildvine-unscreen_beqc9h.gif"
    },
    {
        name: 'spitter',
        img: '/aliens/omniverse/spitter.png',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762784819/spitter-unscreen_kdl0r5.gif"
    },
    {
        name: 'Buzzshock',
        img: '/aliens/omniverse/Buzzshock.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        },
        color: 'blue',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1760795741/buzzshock-unscreen_uyapc8.gif"
    },
    {
        name: 'Arctiguana',
        img: '/aliens/omniverse/Arctiguana.png',
        color: 'cyan',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1760912827/articguana-unscreen-ezgif.com-optimize_mjjoui.gif"
    },
    {
        name: 'Blitzwolfer',
        img: '/aliens/omniverse/blitzwolfer.png',
        height: {
            silouette: 'h-[10rem] lg:h-[15rem]',
            character: 'h-[20rem] lg:h-[25rem] ml-[7rem] mt-[10rem] lg:mt-[10rem]'
        },
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1760909552/blitzwolfer_v0cb86.gif"
    },
    {
        name: 'snareOh',
        img: '/aliens/omniverse/snareOh.png',
        color: 'yellow',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762745481/snare-oh-unscreen_ighkqg.gif"
    },
    {
        name: 'Frankenstrike',
        img: '/aliens/omniverse/Frankenstrike.png',
        color: 'blue',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1761230316/frankenstrike-unscreen-ezgif.com-optimize_cs7o4z.gif"
    },
    {
        name: 'Upchuck1',
        img: '/aliens/omniverse/Upchuck1.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        },
        // video: "https://res.cloudinary.com/dun283iki/image/upload/v1762833869/upchuck1-unscreen_dtrcji.gif"
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762920401/upchuck1-unscreen_2_lgxzgg.gif"
    },
    {
        name: 'Ditto',
        img: '/aliens/omniverse/Ditto.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        },
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1760914561/ditto-unscreen_hx0rtw.gif"
    },
    {
        name: 'EyeGuy',
        img: '/aliens/omniverse/EyeGuy.png',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1761013743/eye-guy-unscreen_o1x1yo.gif"
    },
    {
        name: 'Way_Big',
        img: '/aliens/omniverse/Way_Big.png',
        height: {
            // silouette: 'h-[10rem] lg:h-[15rem]',
            character: 'h-[40rem] lg:h-[50rem] mr-[0rem] -mt-[10rem] lg:-mt-[10rem]'
        },
        color: 'red',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762988532/waybig-unscreen_uaqddq.gif"
    },
    // ORIGINAL -----------------------------------------------------------------------




















    //ALIEN FORCE -----------------------------------------------------------------------
    {
        name: 'Swampfire',
        img: '/aliens/omniverse/Swampfire.png',
        color: 'red',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762788067/swampfire-unscreen_j4jdnf.gif"
    },
    {
        name: 'Goop',
        img: '/aliens/omniverse/Goop.png',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1761397620/goop-unscreen_yku5iu.gif"
    },
    {
        name: 'Chromastone',
        img: '/aliens/omniverse/Chromastone.png',
        color: 'purple',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1760878171/chromastone-unscreen_c2ibln.gif"
    },

    {
        name: 'BigChill',
        img: '/aliens/omniverse/BigChill.png',
        height: {
            silouette: 'h-[10rem] lg:h-[14rem]',
            character: 'h-[30rem] lg:h-[50rem] -mt-[2rem] lg:-mt-[12rem]'
        },
        color: 'blue',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1760877111/big-chill-unscreen_u8umtm.gif"
    },
    {
        name: 'Humungousaur',
        img: '/aliens/omniverse/Humungousaur.png',
        color: 'brown',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762440463/humungosour-unscreen-ezgif.com-optimize_aies4p.gif"
    },
    {
        name: 'brainstorm',
        img: '/aliens/omniverse/brainstorm.png',
        height: {
            silouette: 'h-[10rem] lg:h-[15rem]',
            character: 'h-[20rem] lg:h-[25rem] ml-[0rem] mt-[10rem] lg:mt-[10rem]'
        },
        color: 'brown',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1760708248/brainstorm-unscreen_zd9szg.gif"
    },
    {
        name: 'jetray',
        img: '/aliens/omniverse/jetray.png',
        color: 'red',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762447126/jetray-unscreen_g2eyhz.gif"
    },
    {
        name: 'Spidermonkey',
        img: '/aliens/omniverse/Spidermonkey.png',
        height: {
            silouette: 'h-[10rem] lg:h-[13rem]',
            character: 'h-[22rem] mt-[10rem] lg:mt-[20rem]'
        },
        color: 'blue',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762746282/spider-monkey-unscreen_lnh0xa.gif"
    },
    {
        name: 'EchoEcho',
        img: '/aliens/omniverse/EchoEcho.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        },
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1761013285/echo-echo-unscreen-ezgif.com-optimize_1_vhpihj.gif"
    },
    {
        name: 'AlienX',
        img: '/aliens/omniverse/AlienX.png',
        color: 'white',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1760909285/alien-x-unscreen-ezgif.com-optimize_btoato.gif"
    },
    {
        name: 'Lodestar',
        img: '/aliens/omniverse/Lodestar.png',
        color: 'yellow',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762522232/lodestar-unscreen_ynlbst.gif"
    },
    {
        name: 'Rath',
        img: '/aliens/omniverse/Rath.png',
        color: 'orange',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762744003/rath-unscreen_1_x4pdun.gif"
    },
    {
        name: 'Upchuck2',
        img: '/aliens/omniverse/Upchuck2.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        },
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762833965/upchuck2-unscreen-ezgif.com-optimize_x3vndj.gif"
    },
    //ALIEN FORCE -----------------------------------------------------------------------





















    //ULTIMATE -----------------------------------------------------------------------
    {
        name: 'Nanomech',
        img: '/aliens/omniverse/Nanomech.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        },
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762696372/nanomech-unscreen_zogykl.gif"
    },
    {
        name: 'waterHazard',
        img: '/aliens/omniverse/waterHazard.png',
        color: 'blue',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762986480/waterhazard-unscreen_ryhwlz.gif"
    },
    {
        name: 'Amphibian',
        img: '/aliens/omniverse/Amphibian.png',
        color: 'cyan',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1760911335/amphibiam-unscreen-ezgif.com-optimize_fhlrjx.gif"
    },
    {
        name: 'Armodrillo',
        img: '/aliens/omniverse/Armodrillo.png',
        color: 'yellow',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1760879299/armodrillo-ezgif.com-optimize_wtm19x.gif"
    },
    {
        name: 'Terraspin',
        img: '/aliens/omniverse/Terraspin.png',
        color: 'brown',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762831826/terraspin-unscreen_pmanhk.gif"
    },
    {
        name: 'NRG',
        img: '/aliens/omniverse/NRG.png',
        color: 'orange',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762705185/NRG-unscreen-ezgif.com-optimize_pj30ta.gif"
    },
    {
        name: 'fastrack',
        img: '/aliens/omniverse/fastrack.png',
        color: 'blue',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1761045040/fastrack-unscreen_yf15qb.gif"
    },
    {
        name: 'clockwork',
        img: '/aliens/omniverse/clockwork.png',
        color: 'yellow',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1760879897/clockwork-unscreen-ezgif.com-optimize_ewekva.gif"
    },
    {
        name: 'ChamAlien',
        img: '/aliens/omniverse/ChamAlien.png',
        color: 'purple',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1760877925/chamalien-unscreen_osw3qj.gif"
    },
    {
        name: 'Eatle',
        img: '/aliens/omniverse/Eatle.png',
        color: 'gray',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1760915610/eatle-unscreen_yrlhjb.gif"
    },
    {
        name: 'Jury_rigg',
        img: '/aliens/omniverse/Jury_rigg.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        },
        color: 'red',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762478236/jury-rigg-unscreen_ja0rab.gif"
    },
    //ULTIMATE -----------------------------------------------------------------------























    //OMNIVERSE -----------------------------------------------------------------------
    {
        name: 'Shocksquatch',
        img: '/aliens/omniverse/Shocksquatch.png',
        color: 'yellow',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762744762/Shocksquatch-unscreen-ezgif.com-optimize_xuhpa8.gif"
    },
    {
        name: 'Feedback',
        img: '/aliens/omniverse/Feedback.png',
        color: 'blue',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1761184507/feedback-unscreen_z4bb0u.gif"
    },
    {
        name: 'Bloxx',
        img: '/aliens/omniverse/Bloxx.png',
        color: 'red',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1760908839/bloxx-unscreen_acr47p.gif"
    },
    {
        name: 'Gravattack_Pose',
        img: '/aliens/omniverse/Gravattack_Pose.png',
        color: 'red',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1761400424/gravattack-unscreen_wdobek.gif"
    },
    {
        name: 'Crashhopper',
        img: '/aliens/omniverse/Crashhopper.png',
        color: 'lime',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1760904300/crasshoper-unscreen_wvdlbm.gif"
    },
    {
        name: 'Ball_Weevil',
        img: '/aliens/omniverse/Ball_Weevil.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        },
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1760909991/ball-wevil-unscreen_otehyp.gif"
    },
    {
        name: 'walkatrout',
        img: '/aliens/omniverse/walkatrout.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        },
        color: 'cyan',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762921183/walkatrout-unscreen_nqv1bp.gif"
    },
    {
        name: 'Pesky_Dust',
        img: '/aliens/omniverse/Pesky_Dust.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        },
        color: 'pink',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762743742/pesky-dust-unscreen_1_fedj4e.gif"
    },
    {
        name: 'Mole_Stache',
        img: '/aliens/omniverse/Mole_Stache.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        },
        color: 'yellow',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762695769/molestache-unscreen_qcy9ag.gif"
    },
    {
        name: 'TheWorst',
        img: '/aliens/omniverse/TheWorst.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        },
        color: 'yellow',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762832526/the-worst-unscreen_1_h03rvi.gif"
    },
    {
        name: 'Kicken_Hawk',
        img: '/aliens/omniverse/Kicken_Hawk.png',
        color: 'brown',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762483843/kicken-hawk-unscreen_wqjqp8.gif"
    },
    {
        name: 'Astrodactyl',
        img: '/aliens/omniverse/Astrodactyl.png',
        color: 'brown',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1760668889/astrodactyl-unscreen_ltgr21.gif"
    },
    {
        name: 'Gutrot',
        img: '/aliens/omniverse/Gutrot.png',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1761999020/gutrot-unscreen-ezgif.com-optimize_zqwbon.gif"
    },
    {
        name: 'Toepick',
        img: '/aliens/omniverse/Toepick.png',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762832995/toepick-unscreen1-ezgif.com-optimize_nbr4x9.gif"
    },
    {
        name: 'Bullfrag',
        img: '/aliens/omniverse/Bullfrag.png',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1760708491/bullfrag-unscreen_u7rm5h.gif"
    },
    {
        name: 'Whampire',
        img: '/aliens/omniverse/whampire.png',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1762989457/whampire-unscreen_ftjght.gif"
    },
    {
        name: 'Atomix',
        img: '/aliens/omniverse/atomix.png',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1760876714/atomix-unscreen-ezgif.com-optimize_evzgiw.gif"
    },
    // {
    //     name: 'Feedback2',
    //     img: '/aliens/omniverse/Feedback.png',
    //     video: ""
    // },
    {
        name: 'AlienX2',
        img: '/aliens/omniverse/AlienX.png',
        video: "https://res.cloudinary.com/dun283iki/image/upload/v1760664104/alien_x_enpdj6.gif"
    },
]


//https://www.deviantart.com/thehawkdown/gallery/66867306/ben-10-omnitrix-aliens
//https://www.remove.bg/upload
//https://wordhtml.com