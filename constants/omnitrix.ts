import { Alien } from "../types";

const bigChillsTypeImage = Math.random() < 0.5

//https://www.google.com/search?q=all+ben+10+aliens+first+appearance&client=opera-gx&hs=awI&bih=927&biw=970&hl=en&sxsrf=AB5stBjj-1S2HzAALrtoDaEEh2lrLLrRWA%3A1690040313472&ei=-fe7ZLqxHIPj5NoPlIqosAg&oq=all+ben+10+aliens+first+&gs_lp=Egxnd3Mtd2l6LXNlcnAiGGFsbCBiZW4gMTAgYWxpZW5zIGZpcnN0ICoCCAAyBRAhGKABSIxYUMEdWPRNcAF4AZABAJgB-gGgAdcNqgEGMS4xMS4xuAEDyAEA-AEBwgIKEAAYRxjWBBiwA8ICBxAjGIoFGCfCAggQABiKBRiRAsICBRAAGIAEwgIFEC4YgATCAgcQIxiwAhgnwgIHEAAYDRiABMICBxAuGA0YgATCAgYQABgHGB7CAgcQABiKBRhDwgIKEAAYgAQYFBiHAsICBhAAGBYYHsICCBAAGIoFGIYD4gMEGAAgQYgGAZAGCA&sclient=gws-wiz-serp
export const ALL_ALIENS_OG: Alien[] = [
    {
        name: 'Wildmutt',
        img: '/aliens/og/Wildmutt.png',
        height: {
            silouette: 'h-[10rem] lg:h-[13rem]',
            character: 'h-[22rem] mt-[10rem] lg:mt-[20rem]'
        }
    },
    {
        name: 'Four_arms',
        img: '/aliens/og/Four_arms.png'
    },
    {
        name: 'grey_matter',
        img: '/aliens/og/grey_matter.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[10rem] mt-[20rem] lg:mt-[28rem]'
        }
    },
    {
        name: 'XLR8',
        img: '/aliens/og/XLR8.png',
        height: {
            silouette: 'h-[10rem] lg:h-[14rem]',
            character: 'h-[25rem] lg:h-[30rem] mt-[5rem] lg:mt-[8rem]'
        }
    },
    {
        name: 'Upgrade',
        img: '/aliens/og/Upgrade.webp'
    },
    {
        name: 'Diamondhead',
        img: '/aliens/og/Diamondhead.png'
    },
    {
        name: 'Ripjaws',
        img: '/aliens/og/Ripjaws.png'
    },
    {
        name: 'Stinkfly',
        img: '/aliens/og/Stinkfly.png'
    },
    {
        name: 'ghostfreak',
        img: '/aliens/og/ghostfreak.png'
    },
    {
        name: 'Heatblast',
        img: '/aliens/og/Heatblast.png'
    },
    {
        name: 'Cannonbolt',
        img: '/aliens/og/Cannonbolt.webp'
    },
    {
        name: 'Wildvine',
        img: '/aliens/og/Wildvine.png'
    },
    {
        name: 'Upchuck',
        img: '/aliens/og/Upchuck.png',
        height: {
            silouette: 'h-[13rem] lg:h-[18rem]',
            character: 'h-[23rem] mt-[10rem] lg:mt-[15rem]'
        }
    },
    {
        name: 'benwolf_Blitzwolfer',
        img: '/aliens/og/benwolf_Blitzwolfer.png'
    },
    {
        name: 'benmummy_snare_oh',
        img: '/aliens/og/benmummy_snare_oh.png'
    },
    {
        name: 'benvictor_Frankenstrike',
        img: '/aliens/og/benvictor_Frankenstrike.png'
    },
    {
        name: 'Ditto',
        img: '/aliens/og/Ditto.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[10rem] lg:mt-[15rem]'
        }
    },
    {
        name: 'Spitter',
        img: '/aliens/og/Spitter.png',
        height: {
            silouette: 'h-[10rem] lg:h-[14rem]',
            // character: 'h-[25rem] lg:h-[30rem] mt-[5rem] lg:mt-[8rem]'
        }
    },
    {
        name: 'Buzzshock',
        img: '/aliens/og/Buzzshock.png',
        height: {
            // silouette: 'h-[15rem]',
            character: 'h-[15rem] mt-[17rem] lg:mt-[25rem]'
        }
    },
    {
        name: 'Arctiguana',
        img: '/aliens/og/Arctiguana.png',
        height: {
            silouette: 'h-[13rem] lg:h-[18rem]',
            character: 'h-[28rem] mt-[5rem] lg:mt-[15rem]'
        }

    },
    {
        name: 'eye_guy',
        img: '/aliens/og/eye_guy.png',
    },
    {
        name: 'Way_Big',
        img: '/aliens/og/Way_Big.png',
        height: {
            // silouette: 'h-[13rem] lg:h-[18rem]',
            character: 'h-[50rem] -mt-[15rem] lg:-mt-[10rem]'
        }
    },
    {
        name: 'feedback',
        img: '/aliens/og/feedback.png',
    },
]
    .sort(() => Math.random() - 0.5) //shuffle array 

export const ALL_ALIENS_OG_OMNIVERSE: Alien[] = [
    {
        name: 'Wildmutt',
        img: '/aliens/omniverse/young/Wildmutt.png', //✅
        height: {
            silouette: 'h-[10rem] lg:h-[13rem]',
            character: 'h-[22rem] mt-[10rem] lg:mt-[20rem]'
        }
    },
    {
        name: 'Four_arms',
        img: '/aliens/omniverse/young/Four_arms.png' //✅
    },
    {
        name: 'grey_matter',
        img: '/aliens/omniverse/young/grey_matter.png', //✅
        height: {
            // silouette: 'h-8',
            character: 'h-[10rem] mt-[20rem] lg:mt-[28rem]'
        }
    },
    {
        name: 'XLR8',
        img: '/aliens/omniverse/young/XLR8.png', //✅
        height: {
            silouette: 'h-[10rem] lg:h-[14rem]',
            character: 'h-[25rem] lg:h-[30rem] mt-[5rem] lg:mt-[8rem]'
        }
    },
    {
        name: 'Upgrade',
        img: '/aliens/omniverse/young/Upgrade.png' //✅
    },
    {
        name: 'Diamondhead',
        img: '/aliens/omniverse/young/Diamondhead.png' //✅
    },
    {
        name: 'Ripjaws',
        img: '/aliens/omniverse/young/Ripjaws.png' //✅
    },
    {
        name: 'Stinkfly',
        img: '/aliens/omniverse/young/Stinkfly.png',//✅
        height: {
            silouette: 'h-[10rem] lg:h-[14rem]',
            character: 'h-[45rem] lg:h-[50rem] -mt-[10rem] lg:-mt-[8rem]'
        }
    },
    /* {
        name: 'ghostfreak',
        img: '/aliens/omniverse/young/ghostfreak.png'//✅
    }, */
    {
        name: 'ghostfreak2',
        img: '/aliens/omniverse/young/ghostfreak2.png'//✅
    },
    {
        name: 'Heatblast',
        img: '/aliens/omniverse/heatblast.png' //✅
    },
    {
        name: 'Cannonbolt',
        img: '/aliens/omniverse/young/Cannonbolt.png' //✅
    },
    {
        name: 'Wildvine',
        img: '/aliens/omniverse/young/Wildvine.png' //✅
    },
    {
        name: 'spitter',
        img: '/aliens/omniverse/young/spitter.png'/* , //✅
        height: {
            silouette: 'h-[10rem] lg:h-[14rem]',
            // character: 'h-[25rem] lg:h-[30rem] mt-[5rem] lg:mt-[8rem]'
        } */
    },
    {
        name: 'buzzshock2',
        img: '/aliens/omniverse/young/buzzshock2.png',//✅
        height: {
            // silouette: 'h-[15rem]',
            character: 'h-[15rem] mt-[17rem] lg:mt-[25rem]'
        }
    },
    {
        name: 'Arctiguana',
        img: '/aliens/omniverse/young/Arctiguana.png', //✅
        height: {
            silouette: 'h-[13rem] lg:h-[18rem]',
            character: 'h-[28rem] mt-[5rem] lg:mt-[15rem]'
        }

    },
    {
        name: 'benwolf_Blitzwolfer',
        img: '/aliens/omniverse/young/benwolf_Blitzwolfer.png'//✅
    },
    {
        name: 'benmummy_snare_oh',
        img: '/aliens/omniverse/young/benmummy_snare_oh.png' //✅
    },
    /* {
        name: 'benvictor_Frankenstrike',
        img: '/aliens/omniverse/young/benvictor_Frankenstrike.png' //✅
    }, */
    {
        name: 'benvictor_Frankenstrike2',
        img: '/aliens/omniverse/young/benvictor_Frankenstrike2.png' //✅
    },
    {
        name: 'Upchuck',
        img: '/aliens/omniverse/young/Upchuck.png', //✅
        height: {
            silouette: 'h-[13rem] lg:h-[18rem]',
            character: 'h-[23rem] mt-[10rem] lg:mt-[15rem]'
        }
    },
    {
        name: 'Ditto',
        img: '/aliens/omniverse/young/Ditto.png', //✅
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[10rem] lg:mt-[15rem]'
        }
    },
    {
        name: 'eye_guy',
        img: '/aliens/omniverse/young/eye_guy.png', //✅
        height: {
            // silouette: '',
            character: 'h-[30rem] mt-[10rem] lg:mt-[15rem]'
        }
    },
    {
        name: 'Way_Big',
        img: '/aliens/omniverse/Way_Big.png', //✅
        height: {
            // silouette: 'h-[13rem] lg:h-[18rem]',
            character: 'h-[50rem] -mt-[15rem] lg:-mt-[10rem]'
        }
    },
    {
        name: 'feedback',
        img: '/aliens/omniverse/young/feedback.png' //✅
    },
    {
        name: 'clockwork',
        img: '/aliens/omniverse/young/clockwork.png' //✅
    },
]
    .sort(() => Math.random() - 0.5) //shuffle array 

export const ALL_ALIENS_ALIEN_FORCE: Alien[] = [
    //OG
    {
        name: 'wildmutt',
        img: '/aliens/ultimate/wildmutt.png',
        height: {
            character: 'h-[15rem] md:h-[22rem] mt-[10rem] md:mt-[15rem] lg:mt-[20rem]'
        },
    },
    {
        name: 'FourArms2',
        img: '/aliens/ultimate/FourArms2.png',
    },
    {
        name: 'grey_matter',
        img: '/aliens/ultimate/grey_matter.png',
        height: {
            character: 'h-[8rem] md:h-[10rem] mt-[18rem] md:mt-[20rem] lg:mt-[28rem]'
        }
    },
    {
        name: 'xlr8',
        img: '/aliens/ultimate/xlr8.png',
        height: {
            character: 'h-[17rem] md:h-[20rem] lg:h-[30rem] mt-[7rem] md:mt-[10rem] lg:mt-[8rem]'
        },
    },
    {
        name: 'Upgrade',
        img: '/aliens/ultimate/upgrade.png',
    },
    {
        name: 'Ripjaws',
        img: '/aliens/ultimate/ripjaws.png',
    },
    {
        name: 'Diamondhead',
        img: '/aliens/alien_force/diamondhead.png'
    },
    {
        name: 'stikfly',
        img: '/aliens/ultimate/stikfly.png',
    },
    {
        name: 'ghostfreak',
        img: '/aliens/ultimate/ghostfreak.png',
        height: {
            character: 'h-[23rem] md:h-[25rem] lg:h-[32rem] -mt-[1rem] md:mt-[1rem] lg:mt-[10rem]'
        }
    },
    // {
    //     name: 'Ghostfreak2',
    //     img: '/aliens/ultimate/Ghostfreak2.png',
    // },
    {
        name: 'heatblast',
        img: '/aliens/ultimate/heatblast.png',
    },
    {
        name: 'cannonbolt',
        img: '/aliens/alien_force/cannonbolt.png',
    },
    {
        name: 'wildvine',
        img: '/aliens/ultimate/wildvine.png',
    },
    {
        name: 'spitter',
        img: '/aliens/ultimate/spitter.png',
    },
    {
        name: 'buzzshock',
        img: '/aliens/ultimate/buzzshock.png',
        height: {
            character: 'h-[12rem] md:h-[15rem] mt-[15rem] md:mt-[17rem] lg:mt-[25rem]'
        }
    },
    {
        name: 'articguana',
        img: '/aliens/ultimate/articguana.png',
        height: {
            character: 'h-[22rem] md:h-[28rem] mt-[2rem] md:mt-[5rem] lg:mt-[15rem]'
        }
    },
    {
        name: 'blitzwolfer',
        img: '/aliens/ultimate/blitzwolfer.png',
    },
    {
        name: 'snareoh',
        img: '/aliens/ultimate/snareoh.png',
    },
    // {
    //     name: 'frankenstrike',
    //     img: '/aliens/ultimate/frankenstrike.png',
    // },
    {
        name: 'frankenstrike2',
        img: '/aliens/ultimate/frankenstrike2.png',
    },
    {
        name: 'Upchuck',
        img: '/aliens/alien_force/Upchuck.png',
        height: {
            character: 'h-[15rem] md:h-[23rem] mt-[10rem] md:mt-[15rem] lg:mt-[20rem]'
        }
    },
    {
        name: 'ditto',
        img: '/aliens/ultimate/ditto.png',
        height: {
            character: 'h-[20rem] md:h-[28rem] mt-[5rem] md:mt-[2rem] lg:mt-[15rem]'
        }
    },
    {
        name: 'eye_guy',
        img: '/aliens/ultimate/eye_guy.png',
    },
    {
        name: 'WayBig',
        img: '/aliens/alien_force/WayBig.png',
        height: {
            character: 'h-[40rem] md:h-[50rem] -mt-[12rem] md:-mt-[10rem] lg:-mt-[5rem]'
        },
    },
    {
        name: 'Swampfire',
        img: '/aliens/alien_force/swampfire.png'
    },
    {
        name: 'Goop',
        img: '/aliens/alien_force/Goop.png'
    },
    {
        name: 'Spidermonkey',
        img: '/aliens/alien_force/Spidermonkey.png',
        height: {
            character: 'h-[17rem] md:h-[22rem] mt-[10rem] md:mt-[5rem] lg:mt-[20rem]'
        }
    },
    {
        name: 'bigChill-L',
        img: bigChillsTypeImage ? '/aliens/alien_force/bigChill-L.png' : "/aliens/alien_force/bigChill_hood.png",
        // img: '/aliens/alien_force/bigChill-L.png',
        height: bigChillsTypeImage ? {
            character: 'h-[40rem] ml-[10rem] lg:ml-[15rem] lg:h-[50rem] -mt-[8rem] lg:-mt-[5rem]'
            // character: 'h-[35rem] lg:h-[40rem] mt-[5rem] lg:mt-[5rem]'
        } : undefined,
        little: {
            name: 'bigChill',
            img: bigChillsTypeImage ? '/aliens/alien_force/bigChill.png' : "/aliens/alien_force/bigChill_hood.png",
            // img: '/aliens/alien_force/bigChill.png',
            height: bigChillsTypeImage ? {
                // character: 'h-[30rem] ml-[10rem] lg:ml-[25rem] lg:h-[50rem] mt-[5rem] lg:-mt-[5rem]'
                character: 'h-[30rem] -mt-[5rem]'
            } : undefined,
        },
    },
    {
        name: 'Humungousaur',
        img: Math.random() < 0.5 ? '/aliens/alien_force/humungousaur.png' : "/aliens/alien_force/Humungousaur_Big.webp"
    },
    {
        name: 'Brainstorm',
        img: '/aliens/alien_force/Brainstorm.png',
        height: {
            character: 'h-[17rem] md:h-[25rem] lg:h-[30rem] mt-[8rem] md:mt-[4rem] lg:mt-[12rem]'
        }
    },
    {
        name: 'Jetray',
        img: '/aliens/alien_force/Jetray.webp',
        height: {
            character: 'h-[20rem] md:h-[25rem] lg:h-[30rem] mt-[5rem] lg:mt-[10rem]'
        },
    },
    {
        name: 'Chromastone',
        img: '/aliens/alien_force/Chromastone.png'
    },
    {
        name: 'echo_echo',
        img: '/aliens/alien_force/echo_echo.png',
        height: {
            character: 'h-[18rem] md:h-[23rem] mt-[10rem] lg:mt-[15rem]'
        }
    },
    {
        name: 'Alien X',
        img: '/aliens/alien_force/alienX.png'
    },
    {
        name: 'Lodestar',
        img: '/aliens/alien_force/Lodestar.webp'
    },
    {
        name: 'Nanomech',
        img: '/aliens/alien_force/Nanomech.png',
        height: {
            character: 'h-[10rem] mt-[20rem] lg:mt-[20rem]'
        }
    },
    {
        name: 'Rath',
        img: '/aliens/alien_force/rath.png'
    },
]
// .sort(() => Math.random() - 0.5) //shuffle array

export const ALL_ALIENS_ULTIMATE: Alien[] = [
    //OG
    /**/ {
        name: 'wildmutt',
        img: '/aliens/ultimate/wildmutt.png',
        height: {
            // silouette: 'h-[10rem] lg:h-[13rem]',
            // character: 'h-[22rem] mt-[15rem] lg:mt-[20rem]'
            character: 'h-[15rem] md:h-[22rem] mt-[10rem] md:mt-[15rem] lg:mt-[20rem]'
        },
        ultimate: {
            name: 'UltimateWildmuttOfficial',
            img: '/aliens/ultimate/UltimateWildmuttOfficial.png'
        }
    },
    // {
    //     name: 'FourArms',
    //     img: '/aliens/ultimate/FourArms.png',
    // },
    {
        name: 'FourArms2',
        img: '/aliens/ultimate/FourArms2.png',
    },
    {
        name: 'grey_matter',
        img: '/aliens/ultimate/grey_matter.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[10rem] mt-[20rem] lg:mt-[28rem]'
        }
    },
    {
        name: 'xlr8',
        img: '/aliens/ultimate/xlr8.png',
        height: {
            silouette: 'h-[10rem] lg:h-[14rem]',
            character: 'h-[20rem] lg:h-[30rem] mt-[10rem] lg:mt-[8rem]'
        },
    },
    {
        name: 'Upgrade',
        img: '/aliens/ultimate/upgrade.png',
    },
    {
        name: 'Ripjaws',
        img: '/aliens/ultimate/ripjaws.png',
    },
    {
        name: 'Diamondhead',
        img: '/aliens/alien_force/diamondhead.png'
    },
    {
        name: 'stikfly',
        img: '/aliens/ultimate/stikfly.png',
    },
    {
        name: 'ghostfreak',
        img: '/aliens/ultimate/ghostfreak.png',
    },
    // {
    //     name: 'Ghostfreak2',
    //     img: '/aliens/ultimate/Ghostfreak2.png',
    // },
    {
        name: 'heatblast',
        img: '/aliens/ultimate/heatblast.png',
    },
    {
        name: 'cannonbolt',
        img: '/aliens/alien_force/cannonbolt.png',
        ultimate: {
            name: 'Ultimate_Cannonbolt',
            img: '/aliens/ultimate/Ultimate_Cannonbolt.png'
        }
    },
    {
        name: 'wildvine',
        img: '/aliens/ultimate/wildvine.png',
    },
    {
        name: 'spitter',
        img: '/aliens/ultimate/spitter.png',
    },
    {
        name: 'buzzshock',
        img: '/aliens/ultimate/buzzshock.png',
        height: {
            character: 'h-[15rem] mt-[17rem] lg:mt-[25rem]'
        }
    },
    {
        name: 'articguana',
        img: '/aliens/ultimate/articguana.png',
        height: {
            // silouette: 'h-[13rem] lg:h-[18rem]',
            // character: 'h-[28rem] mt-[5rem] lg:mt-[15rem]'
            character: 'h-[22rem] md:h-[28rem] mt-[2rem] md:mt-[5rem] lg:mt-[15rem]'
        }
    },
    {
        name: 'blitzwolfer',
        img: '/aliens/ultimate/blitzwolfer.png',
    },
    {
        name: 'snareoh',
        img: '/aliens/ultimate/snareoh.png',
    },
    // {
    //     name: 'frankenstrike',
    //     img: '/aliens/ultimate/frankenstrike.png',
    // },
    {
        name: 'frankenstrike2',
        img: '/aliens/ultimate/frankenstrike2.png',
    },
    {
        name: 'Upchuck',
        img: '/aliens/alien_force/Upchuck.png',
        height: {
            // silouette: 'h-[13rem] lg:h-[18rem]',
            // character: 'h-[23rem] mt-[15rem] lg:mt-[20rem]'
            character: 'h-[15rem] md:h-[23rem] mt-[13rem] md:mt-[15rem] lg:mt-[20rem]'
        }
    },
    {
        name: 'ditto',
        img: '/aliens/ultimate/ditto.png',
        height: {
            // silouette: 'h-8',
            // character: 'h-[28rem] mt-[5rem] lg:mt-[15rem]'
            character: 'h-[20rem] md:h-[28rem] mt-[8rem] md:mt-[2rem] lg:mt-[15rem]'
        }
    },
    {
        name: 'eye_guy',
        img: '/aliens/ultimate/eye_guy.png',
    },
    {
        name: 'WayBig',
        img: '/aliens/alien_force/WayBig.png',
        height: {
            // silouette: 'h-[13rem] lg:h-[18rem]',
            // character: 'h-[50rem] -mt-[10rem] lg:-mt-[5rem]'
            character: 'h-[40rem] md:h-[50rem] -mt-[12rem] md:-mt-[10rem] lg:-mt-[5rem]'

        },
        ultimate: {
            name: 'ultimate_wayBig',
            img: '/aliens/ultimate/ultimate_wayBig.png',
            height: {
                // silouette: 'h-[13rem] lg:h-[18rem]',
                // character: 'h-[50rem] -mt-[10rem] lg:-mt-[5rem]'
                character: 'h-[40rem] md:h-[50rem] -mt-[12rem] md:-mt-[10rem] lg:-mt-[5rem]'
            },
        }
    },


    //ALIEN FORCE
    {
        name: 'Swampfire',
        img: '/aliens/alien_force/swampfire.png',
        ultimate: {
            name: 'ultimate_swampfire',
            img: '/aliens/ultimate/ultimate_swampfire.png'
        }
    },
    {
        name: 'Goop',
        img: '/aliens/alien_force/Goop.png'
    },
    {
        name: 'Spidermonkey',
        img: '/aliens/alien_force/Spidermonkey.png',
        height: {
            // character: 'h-[22rem] mt-[15rem] lg:mt-[20rem]'
            character: 'h-[17rem] md:h-[22rem] mt-[10rem] md:mt-[5rem] lg:mt-[20rem]'
        },
        ultimate: {
            name: 'Ultimate_spidermonkey',
            img: '/aliens/ultimate/Ultimate_spidermonkey.png',
            height: {
                character: 'h-[40rem] -mt-[3rem] md:mt-[2rem] lg:mt-[5rem]'
            },
        }
    },

    {
        name: 'bigChill-L',
        img: '/aliens/alien_force/bigChill-L.png',
        height: {
            // character: 'h-[40rem] ml-[10rem] lg:ml-[18rem] lg:h-[50rem] mt-[5rem] lg:-mt-[5rem]'
            character: 'h-[40rem] ml-[10rem] lg:ml-[15rem] lg:h-[50rem] -mt-[8rem] lg:-mt-[5rem]'
        },
        ultimate: {
            name: 'Ultimate_Big_Chill-L',
            img: '/aliens/ultimate/Ultimate_Big_Chill-L.png',
            height: {
                // character: 'h-[40rem] ml-[10rem] lg:ml-[15rem] lg:h-[50rem] mt-[5rem] lg:-mt-[5rem]'
                character: 'h-[40rem] ml-[10rem] lg:ml-[10rem] lg:h-[50rem] -mt-[8rem] lg:-mt-[5rem]'
            },
        },
        little: {
            name: 'bigChill',
            img: '/aliens/alien_force/bigChill.png',
            height: {
                // silouette: 'h-[20rem] lg:h-[18rem]',
                // character: 'h-[30rem] ml-[10rem] lg:ml-[25rem] lg:h-[50rem] mt-[5rem] lg:-mt-[5rem]'
                // character: 'h-[35rem] lg:h-[40rem] mt-[5rem] lg:mt-[5rem]'
                character: 'h-[30rem] mt-[2rem]'

            },
            ultimate: {
                name: 'Ultimate_Big_Chill',
                img: '/aliens/ultimate/Ultimate_Big_Chill.png',
                height: {
                    // silouette: 'h-[20rem] lg:h-[18rem]',
                    // character: 'h-[30rem] ml-[10rem] lg:ml-[18rem] lg:h-[50rem] mt-[5rem] lg:-mt-[5rem]'
                    // character: 'h-[35rem] lg:h-[40rem] mt-[5rem] lg:mt-[5rem]'
                    character: 'h-[30rem] mt-[2rem]'

                },
            }
        },
    },
    {
        name: 'Humungousaur',
        img: '/aliens/alien_force/humungousaur.png',
        ultimate: {
            name: 'ultimate_Humungousaur',
            img: '/aliens/ultimate/ultimate_Humungousaur.png'
        }
    },
    {
        name: 'Brainstorm',
        img: '/aliens/alien_force/Brainstorm.png',
        height: {
            // character: 'h-[25rem] lg:h-[30rem] ml-0 lg:ml-[20rem] mt-[10rem] lg:mt-[15rem]'
            character: 'h-[17rem] md:h-[25rem] lg:h-[30rem] mt-[12rem] md:mt-[4rem] lg:mt-[12rem]'
        }
    },
    {
        name: 'Jetray',
        img: '/aliens/alien_force/Jetray.webp',
        height: {
            // character: 'h-[30rem] mt-[5rem] lg:mt-[10rem]'
            character: 'h-[20rem] md:h-[25rem] lg:h-[30rem] mt-[8rem] md:mt-[2rem] lg:mt-[10rem]'
        },
    },
    {
        name: 'Chromastone',
        img: '/aliens/alien_force/Chromastone.png'
    },
    {
        name: 'echo_echo',
        img: '/aliens/alien_force/echo_echo.png',
        height: {
            // silouette: 'h-[10rem]',
            // character: 'h-[23rem] mt-[15rem] lg:mt-[23rem]'
            character: 'h-[18rem] md:h-[23rem] mt-[10rem] lg:mt-[15rem]'
        },
        ultimate: {
            name: 'Ultimate_EchoEcho',
            img: '/aliens/ultimate/Ultimate_EchoEcho.png',
            height: {
                // silouette: 'h-[10rem]',
                character: 'h-[30rem] md:h-[35rem] lg:h-[40rem] mt-[2rem] md:-mt-[5rem] lg:mt-[5rem]'
            },
        }
    },
    {
        name: 'Alien X',
        img: '/aliens/alien_force/alienX.png'
    },
    {
        name: 'Rath',
        img: '/aliens/alien_force/rath.png'
    },
    {
        name: 'Lodestar',
        img: '/aliens/alien_force/Lodestar.webp'
    },

    //ULTIMATE
    {
        name: 'Nanomech',
        img: '/aliens/alien_force/Nanomech.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[10rem] mt-[18rem] md:mt-[15rem] lg:mt-[28rem]'
        }
    },
    {
        name: 'amphibian',
        img: '/aliens/ultimate/amphibian.png'
    },
    {
        name: 'Armodrillo',
        img: '/aliens/ultimate/Armodrillo.png',
    },
    {
        name: 'WaterHazard',
        img: '/aliens/ultimate/WaterHazard.png',
    },
    {
        name: 'NRG',
        img: '/aliens/ultimate/NRG.png',
    },
    {
        name: 'Terraspin',
        img: '/aliens/ultimate/Terraspin.png',
    },
    {
        name: 'eatle',
        img: '/aliens/ultimate/eatle.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[30rem] md:h-[40rem] lg:h-[50rem] -mt-[5rem] lg:-mt-[5rem]'
        }
    },
    {
        name: 'Jury_Rigg',
        img: '/aliens/ultimate/Jury_Rigg.png',
        height: {
            // silouette: 'h-8',
            // character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
            character: 'h-[18rem] md:h-[23rem] mt-[10rem] lg:mt-[15rem]'
        }
    },
    {
        name: 'ChamAlien',
        img: '/aliens/ultimate/ChamAlien.png',
        height: {
            // silouette: 'h-8',
            // character: 'h-[28rem] mt-[5rem] lg:mt-[15rem]'
            character: 'h-[20rem] md:h-[25rem] mt-[10rem] lg:mt-[15rem]'
        }
    },
    {
        name: 'Fasttrack',
        img: '/aliens/ultimate/Fasttrack.png',
        height: {
            // silouette: 'h-[10rem] lg:h-[13rem]',
            character: 'h-[25rem] md:h-[35rem] lg:h-[40rem] mt-[0rem] lg:mt-[5rem]'
        },
    },
    {
        name: 'Clockwork',
        img: '/aliens/ultimate/Clockwork.png',
    },
    {
        name: 'Shocksquatch',
        img: '/aliens/ultimate/Shocksquatch.png',
    },
    {
        name: 'feedback',
        img: '/aliens/ultimate/feedback.png',
        height: {
            character: 'h-[30rem] lg:h-[40rem] ml-[5rem] md:ml-[10rem]'
        }
    }, /**/
    // ...ALL_ALIENS_ALIEN_FORCE 
]
    .sort(() => Math.random() - 0.5) //shuffle array 

export const ALL_ALIENS_OMNIVERSE: Alien[] = [
    // ORIGINAL -----------------------------------------------------------------------
    {
        name: 'Wildmutt',
        img: '/aliens/omniverse/Wildmutt.png',
        height: {
            silouette: 'h-[10rem] lg:h-[15rem]',
            character: 'h-[20rem] lg:h-[30rem] ml-[1rem] mt-[10rem] lg:mt-[5rem]'
        },
        color: 'orange'
    },
    {
        name: 'fourArms',
        img: '/aliens/omniverse/fourArms.png',
        color: 'red'
    },
    {
        name: 'GreyMatter',
        img: '/aliens/omniverse/GreyMatter.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        },
        color: 'gray'
    },
    {
        name: 'XLR8',
        img: '/aliens/omniverse/XLR8.png',
        height: {
            silouette: 'h-[10rem] lg:h-[14rem]',
            character: 'h-[20rem] lg:h-[30rem] mt-[10rem] lg:mt-[8rem]'
        },
        color: 'blue'
    },
    {
        name: 'Upgrade',
        img: '/aliens/omniverse/Upgrade.png'
    },
    {
        name: 'Diamondhead',
        img: '/aliens/omniverse/Diamondhead.png',
        color: 'cyan'
    },
    {
        name: 'Ripjaws',
        img: '/aliens/omniverse/Ripjaws.png'
    },
    {
        name: 'Stinkfly',
        img: '/aliens/omniverse/Stinkfly.png',
        height: {
            silouette: 'h-[10rem] lg:h-[14rem]',
            character: 'h-[35rem] lg:h-[45rem] -mt-[5rem] lg:-mt-[8rem]'
        }
    },
    {
        name: 'Ghostfreak',
        img: '/aliens/omniverse/Ghostfreak.png'
    },
    {
        name: 'Heatblast',
        img: '/aliens/omniverse/heatblast.png',
        color: 'yellow'
    },
    {
        name: 'Cannonbolt',
        img: '/aliens/omniverse/Cannonbolt.png',
        color: 'yellow'
    },
    {
        name: 'Wildvine',
        img: '/aliens/omniverse/Wildvine.png',
        color: 'lime'
    },
    {
        name: 'spitter',
        img: '/aliens/omniverse/spitter.png'
    },
    {
        name: 'Buzzshock',
        img: '/aliens/omniverse/Buzzshock.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        },
        color: 'blue'
    },
    {
        name: 'Arctiguana',
        img: '/aliens/omniverse/Arctiguana.png',
        color: 'cyan'
    },
    {
        name: 'Blitzwolfer',
        img: '/aliens/omniverse/blitzwolfer.png',
        height: {
            silouette: 'h-[10rem] lg:h-[15rem]',
            character: 'h-[20rem] lg:h-[25rem] ml-[7rem] mt-[10rem] lg:mt-[10rem]'
        }
    },
    {
        name: 'snareOh',
        img: '/aliens/omniverse/snareOh.png',
        color: 'yellow'
    },
    {
        name: 'Frankenstrike',
        img: '/aliens/omniverse/Frankenstrike.png',
        color: 'blue'
    },
    {
        name: 'Upchuck1',
        img: '/aliens/omniverse/Upchuck1.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        }
    },
    {
        name: 'Ditto',
        img: '/aliens/omniverse/Ditto.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        }
    },
    {
        name: 'EyeGuy',
        img: '/aliens/omniverse/EyeGuy.png'
    },
    {
        name: 'Way_Big',
        img: '/aliens/omniverse/Way_Big.png',
        height: {
            // silouette: 'h-[10rem] lg:h-[15rem]',
            character: 'h-[40rem] lg:h-[50rem] mr-[0rem] -mt-[10rem] lg:-mt-[10rem]'
        },
        color: 'red'
    },
    // ORIGINAL -----------------------------------------------------------------------




















    //ALIEN FORCE -----------------------------------------------------------------------
    {
        name: 'Swampfire',
        img: '/aliens/omniverse/Swampfire.png',
        color: 'red'
    },
    {
        name: 'Goop',
        img: '/aliens/omniverse/Goop.png'
    },
    {
        name: 'Spidermonkey',
        img: '/aliens/omniverse/Spidermonkey.png',
        height: {
            silouette: 'h-[10rem] lg:h-[13rem]',
            character: 'h-[22rem] mt-[10rem] lg:mt-[20rem]'
        },
        color: 'blue'
    },
    {
        name: 'BigChill',
        img: '/aliens/omniverse/BigChill.png',
        height: {
            silouette: 'h-[10rem] lg:h-[14rem]',
            character: 'h-[30rem] lg:h-[50rem] -mt-[2rem] lg:-mt-[12rem]'
        },
        color: 'blue'
    },
    {
        name: 'Humungousaur',
        img: '/aliens/omniverse/Humungousaur.png',
        color: 'brown'
    },
    {
        name: 'brainstorm',
        img: '/aliens/omniverse/brainstorm.png',
        height: {
            silouette: 'h-[10rem] lg:h-[15rem]',
            character: 'h-[20rem] lg:h-[25rem] ml-[0rem] mt-[10rem] lg:mt-[10rem]'
        },
        color: 'brown'
    },
    {
        name: 'jetray',
        img: '/aliens/omniverse/jetray.png',
        color: 'red'
    },
    {
        name: 'Chromastone',
        img: '/aliens/omniverse/Chromastone.png',
        color: 'purple'
    },
    {
        name: 'EchoEcho',
        img: '/aliens/omniverse/EchoEcho.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        }
    },
    {
        name: 'AlienX',
        img: '/aliens/omniverse/AlienX.png',
        color: 'white'
    },
    {
        name: 'Lodestar',
        img: '/aliens/omniverse/Lodestar.png',
        color: 'yellow'
    },
    {
        name: 'Rath',
        img: '/aliens/omniverse/Rath.png',
        color: 'orange'
    },
    {
        name: 'Upchuck2',
        img: '/aliens/omniverse/Upchuck2.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        }
    },
    //ALIEN FORCE -----------------------------------------------------------------------





















    //ULTIMATE -----------------------------------------------------------------------
    {
        name: 'Nanomech',
        img: '/aliens/omniverse/Nanomech.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        }
    },
    {
        name: 'waterHazard',
        img: '/aliens/omniverse/waterHazard.png',
        color: 'blue'
    },
    {
        name: 'AmpFibian',
        img: '/aliens/omniverse/AmpFibian.png',
        color: 'cyan'
    },
    {
        name: 'Armodrillo',
        img: '/aliens/omniverse/Armodrillo.png',
        color: 'yellow'
    },
    {
        name: 'Terraspin',
        img: '/aliens/omniverse/Terraspin.png',
        color: 'brown'
    },
    {
        name: 'NRG',
        img: '/aliens/omniverse/NRG.png',
        color: 'orange'
    },
    {
        name: 'fastrack',
        img: '/aliens/omniverse/fastrack.png',
        color: 'blue'
    },
    {
        name: 'clockwork',
        img: '/aliens/omniverse/clockwork.png',
        color: 'yellow'
    },
    {
        name: 'ChamAlien',
        img: '/aliens/omniverse/ChamAlien.png',
        color: 'purple'
    },
    {
        name: 'Eatle',
        img: '/aliens/omniverse/Eatle.png',
        color: 'gray'
    },
    {
        name: 'Jury_rigg',
        img: '/aliens/omniverse/Jury_rigg.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        },
        color: 'red'
    },
    //ULTIMATE -----------------------------------------------------------------------























    //OMNIVERSE -----------------------------------------------------------------------
    {
        name: 'Shocksquatch',
        img: '/aliens/omniverse/Shocksquatch.png',
        color: 'yellow'
    },
    {
        name: 'Feedback',
        img: '/aliens/omniverse/Feedback.png',
        color: 'blue'
    },
    {
        name: 'Bloxx',
        img: '/aliens/omniverse/Bloxx.png',
        color: 'red'
    },
    {
        name: 'Gravattack_Pose',
        img: '/aliens/omniverse/Gravattack_Pose.png',
        color: 'red'
    },
    {
        name: 'Crashhopper',
        img: '/aliens/omniverse/Crashhopper.png',
        color: 'lime'
    },
    {
        name: 'Ball_Weevil',
        img: '/aliens/omniverse/Ball_Weevil.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        }
    },
    {
        name: 'walkatrout',
        img: '/aliens/omniverse/walkatrout.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        },
        color: 'cyan'
    },
    {
        name: 'Pesky_Dust',
        img: '/aliens/omniverse/Pesky_Dust.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        },
        color: 'pink'
    },
    {
        name: 'Mole_Stache',
        img: '/aliens/omniverse/Mole_Stache.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        },
        color: 'yellow'
    },
    {
        name: 'TheWorst',
        img: '/aliens/omniverse/TheWorst.png',
        height: {
            // silouette: 'h-8',
            character: 'h-[23rem] mt-[5rem] lg:mt-[15rem]'
        },
        color: 'yellow'
    },
    {
        name: 'Kicken_Hawk',
        img: '/aliens/omniverse/Kicken_Hawk.png',
        color: 'brown'
    },
    {
        name: 'Astrodactyl',
        img: '/aliens/omniverse/Astrodactyl.png',
        color: 'brown'
    },
    {
        name: 'Gutrot',
        img: '/aliens/omniverse/Gutrot.png'
    },
    {
        name: 'Toepick',
        img: '/aliens/omniverse/Toepick.png'
    },
    {
        name: 'Bullfrag',
        img: '/aliens/omniverse/Bullfrag.png'
    },
    {
        name: 'Whampire',
        img: '/aliens/omniverse/whampire.png'
    },
    {
        name: 'Atomix',
        img: '/aliens/omniverse/atomix.png'
    },
    {
        name: 'Feedback2',
        img: '/aliens/omniverse/Feedback.png'
    },
    {
        name: 'AlienX2',
        img: '/aliens/omniverse/AlienX.png'
    },
]


export const ALL_ALIENS_BRAND_NEW: Alien[] = [
    {
        name: 'Gateway',
        img: '/aliens/brand_new/gateway.png',
        /* height: {
            silouette: 'h-[10rem] lg:h-[15rem]',
            character: 'h-[20rem] lg:h-[30rem] ml-[1rem] mt-[10rem] lg:mt-[5rem]'
        }, */
        abilities: `<ul>
        <li><strong>Portal Generation</strong> - Gateway is capable of creating portals of various sizes across long or short distances that himself and multiple people can cross through. He can incorporate his portals into a unique style of combat and use them effectively and strategically.</li>
        <li><strong>Teleportation</strong> - Through the use of his portals, he can teleport anywhere he wishes (within radius) and have environmental advantage over an enemy.</li>
        <li><strong>Dimensional Piercing</strong> - He is capable of creating portals across longer distances and even pierce through dimensions (like the null void), but this requires intense concentration.</li>
        <li><strong>Vacuum Suction</strong> - His portals can suck things within itself through a vacuum at Gateway&rsquo;s desire.</li>
        <li><strong>Flight</strong> - He can levitate through the air at a fair speed.</li>
        <li><strong>Space Survivability</strong> - Gateway can survive in the vacuum of space.</li>
    </ul>`,

        weaknesses: `<ul>
        <li><strong>Distance Limitation</strong> - He can mainly shoot a portal to where can see and his portals are limit to around a 20-50 mile radius.</li>
        <li><strong>Spacial Confusion</strong> - Utilising too many portals may confuse his sense of space and direction.</li>
        <li><strong>Portal Strain</strong> - If Gateway opens his dimensional portals open for a long time, it puts a strain on his body.</li>
    </ul>`
    },

    {
        name: 'Avalanche',
        img: '/aliens/brand_new/avalanche.png',
        /* height: {
            silouette: 'h-[10rem] lg:h-[15rem]',
            character: 'h-[20rem] lg:h-[30rem] ml-[1rem] mt-[10rem] lg:mt-[5rem]'
        }, */
        abilities: `<ul>
        <li><strong>Earthquake Generation</strong> - Avalanche can emit strong vibrational waves from his body that can rupture the ground and create earthquakes between a 6.0 to a 9.5 on the Richter Scale.</li>
        <li><strong>Stone Manipulation</strong> - He can control various types of Earth and alien stone to his will. Ranging from large pillars from the ground and levitating huge boulders with ease, he can even throw them at a fast rate with his mind.</li>
        <li><strong>Enhanced Strength</strong> - His massive size and stone structure grants him super strength, able to crush steel effortlessly.</li>
        <li><strong>Enhanced Durability</strong> - His rocky structure is able to withstand bullets and explosions.</li>
    </ul>`,

        weaknesses: `<ul>
        <li><strong>Large Size</strong> - His size limits his mobility so he generally runs slower than most species.&nbsp;</li>
        <li><strong>Durability Limit</strong> - While he is made of stone, he is not indestructible, he can be brittle with enough force.</li>
    </ul>`
    },

    {
        name: 'ravenstorm',
        img: '/aliens/brand_new/ravenstorm.png',
        abilities: `<ul>
        <li><strong>Weather Manipulation</strong> - Ravenstorm can manipulate weather in any form including control tornadoes, storms, rain, hail, lightning, wind, snow and extreme heat all from the movement of his hands and his wings.</li>
        <li><strong>Temperature Manipulation</strong> - He can manipulate the temperature of himself and his surroundings. Such as making things hot enough to burn and melt, and cold enough to freeze. He can breathe both ice and heat from his mouth.</li>
        <li><strong>Flight</strong> - He can fly at great speeds, and fly even faster with the aid of wind.</li>
        <li><strong>Sharp Talons</strong> - His claws and talons are sharp enough to rip through steel.</li>
        <li><strong>Electricity Manipulation</strong> - When powered by lighting, Ravenstorm can store and release it as electrical attacks.</li>
    </ul>`,

        weaknesses: `<ul>
        <li><strong>Heavy Loads of Water</strong> - Large amounts will dampen his wings and become unsuitably for flying, but he can recover by blowing his wings out if he&apos;s quick enough..</li>
        <li><strong>Durability Limit</strong> - Ravenstorm is pretty durable, but he has his limits as getting hit by a bus can stun him greatly.</li>
    </ul>`
    },

    {
        name: 'mindwipe',
        img: '/aliens/brand_new/mindwipe.png',
        abilities: `<ul>
        <li><strong>Telepathy</strong> - Mindwipe possesses a brain that is able to read other people&apos;s thoughts in real time, erasing&nbsp;and altering their memories, and slightly persuade them to his will</li>
        <li><strong>Telekinesis</strong> - He is able to move objects larger than him with his mind and project powerful forcefields for protection.</li>
        <li><strong>Enhanced Intelligence</strong> - He is very intelligence thereby solving complicated problems in seconds and recall any information through combing his telepathy.</li>
        <li><strong>Enhanced Agility</strong> - His monkey-like appearance grants him super-human agility and dexterity through his hands, feet, and tail.</li>
    </ul>`,

        weaknesses: `<ul>
        <li><strong>Small Size</strong> - His small size can be a problem when facing larger opponents and his maximum weight when using his telekinesis to lift is a truck.</li>
        <li><strong>Telepathic Immunity</strong> - People with strong wills and complete control of their mind can be immune to his telepathy.</li>
    </ul>`
    },



    {
        name: 'lavaflow',
        img: '/aliens/brand_new/lavaflow.png',
        abilities: `<ul>
        <li><strong>Geo-Thermokinesis</strong> - Lavaflow can generate and manipulate lava at any capacity. Shooting streams of lava from his hands and mouth as well as converting the ground into lava, making waves in the process.</li>
        <li><strong>Fire Generation</strong> - In turn he can also generate fire from any part of his body for fire attacks and even jet propulsive flight.</li>
        <li><strong>Enhanced Agility</strong> - Lavaflow possess superhuman agility and dexterity, and flexibility that gives him a great advantage in combat. Able to leap long distances and run on all four limbs. His tail is also prehensile.</li>
    </ul>`,

        weaknesses: `<ul>
        <li><strong>Extinguishment</strong> - Any flame extinguishable properties such as water, carbon dioxide and ice will short out his powers depending on the quantity.</li>
        <li><strong>Eccentric Personality&nbsp;</strong>- His mischievous personality can bring unwanted destruction and harm to those around if he doesn&apos;t keep control of himself.</li>
    </ul>`
    },

    {
        name: 'sparkfly',
        img: '/aliens/brand_new/sparkfly.png',
        abilities: `<ul>
        <li><strong>Electrokinesis</strong> - Sparkfly&rsquo;s limbs, stinger, wings, and antennae composed of electricity, therefor he can generate large amounts of raw yellow electrical charges.</li>
        <li><strong>Electricity Absorption</strong> - In turn he can also absorb high amounts of electricity from any source as well as redirect it as a conductor.</li>
        <li><strong>High Speed Flight</strong> - His wings allow him to fly at high speeds (even for his size), and combined with his electrical conversion allows him shoot off like a living laser beam.</li>
        <li><strong>Small Size</strong> - Sparkly is about 5 inches tall, which can be useful for certain situations.</li>
        <li><strong>Sharp Limps</strong> - His is limbs and stinger are super sharp as he can stab them through metal.</li>
    </ul>`,
        weaknesses: `<ul>
        <li><strong>Small Size</strong> -This can be a huge disadvantage to much larger opponents.</li>
        <li><strong>Insulation</strong> - Sparkfly can&rsquo;t use his electrical abilities if he is insulated in a thick substance.</li>
        <li><strong>Water&nbsp;</strong>- Water can both dampen his insect wings and short out his powers temporarily.</li>
        <li><strong>Eccentric Personality</strong> - He has a very energetic personality, which can often make him impatient and sporadic in battle and conversation.</li>
    </ul>`
    },

    {
        name: 'frostcomet',
        img: '/aliens/brand_new/frostcomet.png',
        abilities: `<ul>
        <li><strong>Ice Generation</strong> - Frostcomet&rsquo;s body is made of pure icy-energy, thus allowing him to create ice blasts from his hands and face therefor flash-freezing anything he blasts. The limit to his power is unknown, but he is able to freeze an entire lake in less than a minute.</li>
        <li><strong>Kinetic&nbsp;</strong><strong>Energy Field Propulsion</strong>- Frostcomet can generate a unique energy that is used as thrust to cause his body to be propelled through the air like a comet, achieving great heights and speeds.</li>
        <li><strong>Space Survivability</strong> - Frostcomet can survive in the vacuum of space indefinitely, this also extends to extreme hot and cold temperatures.</li>
        <li><strong>Superhuman Durability</strong> - His body is covered in an organic cosmic amour, possessing the durability to withstand physical blows and extreme temperatures.</li>
    </ul>`,
        weaknesses: `<ul>
        <li><strong>Extreme Heat</strong> - High amounts of heat can melt his ice and cause them to break down and liquify.</li>
        <li><strong>Flight Path&nbsp;</strong>- His comet flight can be uncontrollable and difficult to steer, so he must remain straight and fast.</li>
    </ul>`
    },

    {
        name: 'ravage',
        img: '/aliens/brand_new/ravage.png',
        abilities: `<ul>
        <li><strong>Enhanced Strength</strong> - Ravage is a large lizard-like alien than can rip open a car as if it was nothing and carry multiple people on his back.</li>
        <li><strong>Enhanced Agility</strong> - His animalistic appearance grants him leaping abilities and he can climb on almost any surface.</li>
        <li><strong>Enhanced Durability</strong> - His skin is highly durable enough to block a bullet and fire blasts.</li>
        <li><strong>Sharp Spikes</strong> - His claws, spikes and massive horn is sharp enough to rip through steel and secure his body in place, impervious to outside forces.</li>
        <li><strong>Long Tongue</strong> - His tongue can stretch to great lengths at an alarming speed.</li>
        <li><strong>Slime Projection</strong> - He can spit out sticky slime that can trap enemies and put out fires.</li>
        <li><strong>Under Water Breathing</strong> - He&apos;s able to breathe underwater therefor become an incredibly fast</li>
    </ul>`,
        weaknesses: `<ul>
        <li><strong>Cold Blooded</strong> - He is a cold blooded alien so extreme cold will weaken him and even incapacitate him.</li>
        <li><strong>Savagery Control</strong> - His natural animal instincts can become overwhelming given the circumstances, making him act more savage and animalistic in nature.</li>
        <li><strong>Durability Limit</strong> - His skin may be durable, but it&apos;s not indestructible, so he will get hurt with enough force.&nbsp;</li>
    </ul>`
    },

    {
        name: 'snap_claw',
        img: '/aliens/brand_new/snap_claw.png',
        abilities: `<ul>
        <li><strong>Enhanced Strength</strong> - His primary power is his brute strength, he is strong enough to throw a truck with ease with both his arms and tail. His tail can pin down and swing a helicopter with full force.</li>
        <li><strong>Enhanced Durability</strong> - His highly durable exoskeleton can withstand the force of several thousand pounds of metal at full speed.</li>
        <li><strong>Sharp Claws and Stinge</strong>r - His extremely sharp claws can cut through almost any material with ease and the snapping speed is incredible, his tail stinger can also stab through steel.</li>
        <li><strong>Under Water Breathing</strong> - Snap Claw can breathe underwater.</li>
        <li><strong>Wall Crawling</strong> - He can scale vertical walls with his legs.</li>
    </ul>`,
        weaknesses: `<ul>
        <li><strong>Large Size</strong> - His massive size can become a problem when dealing with faster situations.</li>
        <li><strong>Dry Environments</strong> - Extremely dry environments and lack of moisture will dehydrate him and weaken him.</li>
        <li><strong>Non Dexterous Limbs</strong> - His four spider-like legs can be tripped when he&rsquo;s not expecting it and his lack of fingers can be disadvantage for more intricate situations.</li>
    </ul>`
    },

    {
        name: 'mudrock',
        img: '/aliens/brand_new/mudrock.png',
        abilities: `<ul>
        <li><strong><b>Malleable Clay-like Body</b>&nbsp;</strong>- Mudrock is composed of a liquid/solid substance akin to mud or slime. With this he can shape shift his body into a variety of shapes for situations involving stretching, sticking, dodging, and squeezing.</li>
        <li><strong>Density Shifting</strong> - He can shift his liquid slime to solid rock which increases his density and hardness, thereby converting is appendages into weapons for attacks.</li>
        <li><strong>Superhuman Strength</strong> - Both his goop body and his stone body grants him tremendous strength when he&apos;s either smashing or binding enemies with his own body.</li>
    </ul>`,
        weaknesses: `<ul>
        <li><strong>Electricity</strong> - His body is super conductive, electricity will cause his body to melt quickly and become an imobilized puddle of mud temporarily.</li>
        <li><strong>Low Temperatures</strong> - He is susceptible to freezing and cold based attacks, freezing him to a standstill.</li>
    </ul>`
    },

    {
        name: 'soundcrawler',
        img: '/aliens/brand_new/soundcrawler.png',
        abilities: `<ul>
        <li><strong>Sonic Wave Emission</strong> - Soundcrawler&rsquo;s wings can emit a hypersonic frequency that can shatter glass, overload machinery, disorientate enemies, and even push back anything within his radius.</li>
        <li><strong>Sound Nullification</strong> - He can nullify his own ambient sound to be as quiet as a flea when moving, which is perfect for stealth.</li>
        <li><strong>Sonic Boom</strong> - A sharp flap of his wings will make a sonic boom.</li>
        <li><strong>Enhanced Durability</strong> - He possesses an insectoid-type body that has an extremely durable exoskeleton, the dark green parts are tougher than the light which allows his pincers to stab through steel.</li>
        <li><strong>Enhanced Jumping</strong> - He has incredible leaping abilities that allow him to jump to nearly 150 feet.</li>
        <li><strong>Venomous Stinger</strong> - His stinger can knock out whoever is struck with it.</li>
        <li><strong>Flight&nbsp;</strong>- He is able to fly at fair speeds.</li>
    </ul>`,
        weaknesses: `<ul>
        <li><strong>Water</strong> - Water can make his wings too wet and be unable to flap fast.</li>
        <li><strong>Durability Limit</strong> - While his exoskeleton is tough, he&rsquo;s not indestructible, enough strength and blows can hurt him.</li>
        <li><strong>Super Hearing</strong> - His sound nullification can be a overlooked by beings with super hearing.</li>
    </ul>`
    },

    {
        name: 'nightslasher',
        img: '/aliens/brand_new/nightslasher.png',
        abilities: `<ul>
        <li><strong>Energy Projection</strong> - Nightslasher can project large amounts of energy from his bones and his mouth. This energy can either be a burning energy to melt steel or a concussive beam to blast enemies.</li>
        <li><strong>Energy Blade Projectiles</strong> - He can make his spikes radiate with this energy and shoot them out as projectiles.</li>
        <li><strong>Energy Claws</strong> - His energy can be stored in his sharp claws and make them cut even more deadly.</li>
        <li><strong>Enhanced Agility</strong> - His skinny appearance allows him to possess great agility and even some form of enhanced strength.</li>
    </ul>`,
        weaknesses: `<ul>
        <li><strong>Limited Energy</strong> - Nightslasher does not have limitless energy, though the Omnitrix automatically provides him with some energy, this can run out. In which case he will have to recharge because the energy within him will deplete with use.</li>
        <li><strong>Weak Spots</strong> - His exposed bones are pretty sensitive, good strikes to them can cause pain and even paralysis to him.</li>
    </ul>`
    },

    {
        name: 'shroomhead',
        img: '/aliens/brand_new/shroomhead.png',
        abilities: `<ul>
        <li><strong>Highly Durable Skull&nbsp;</strong>- Shroomhead&rsquo;s head is covered by an indestructible exoskeleton plate, able to withstand bullets and explosions. He can survive a fall from over 3000 feet just by landing on his head, with a slight headache afterwards.</li>
        <li><strong>Spore Emission</strong> - The holes on his head and hands emit spores that possess those around him and must obey to his will, effectively mind controlling them.</li>
        <li><strong>Fungal Generation</strong> - His spores have the ability to grow mushrooms rapidly and therefor allow his to control them.</li>
        <li><strong>Flexible Body&nbsp;</strong>- His squishy body is useful for squeezing in short places, dodging and jumping.&nbsp;</li>
    </ul>`,
        weaknesses: `<ul>
        <ul>
            <li><strong>Small Size</strong> - Shroomhead is about 2 feet tall, his short size can also be a disadvantage when dealing with larger enemies.</li>
            <li><strong>Limited Telepathy</strong> - His spores are useless with opponents with no minds to control.</li>
            <li><strong>Edible Body</strong> - His species is the most delicious taste in the known Universe, so for those who consider him a delicacy will go after him to eat him.</li>
        </ul>
    </ul>`
    },

    {
        name: 'blastzone',
        img: '/aliens/brand_new/blastzone.png',
        abilities: `<ul>
        <ul>
            <li><strong>Kinetic Energy Empowerment</strong> - Blastzone can control and release kinetic energy in any object he touches and force them to build up with this charge and then explode, the bigger the object the bigger the explosion.</li>
            <li><strong>Enhanced Strength</strong> - His large size combined storing kinetic energy grants him enhanced strength that allows him to lift trucks and stop trains.</li>
            <li><strong>Explosive Attacks</strong> - He can telekinetically make things explode if they&rsquo;re near enough, such as beneath his feet for a boosted jump.</li>
            <li><strong>Enhanced Durability&nbsp;</strong>- His kinetic energy acts as a forcefield on his skin, granting him tremendous durability that&rsquo;s borderline invulnerable.</li>
        </ul>
    </ul>`,
        weaknesses: `<ul>
        <ul>
            <li><strong>Containment Suit&nbsp;</strong>- &nbsp;His full destructive potential is limited by his special containment suit that absorbs most of the kinetic energy he stores, if he wasn&apos;t in his suit he would uncontrollably generate explosions powerful enough to destroy a city.</li>
            <li><strong>Destructive Capabilities</strong> - His standard level of power can be a hinderance on local bystanders and environment, so he must be careful when using his powers.</li>
        </ul>
    </ul>`
    },

    {
        name: 'lightviper',
        img: '/aliens/brand_new/lightviper.png',
        abilities: `<ul>
        <ul>
            <li><strong>Light Manipulation</strong> - Lightviper can manipulate visible light in his body and thus utilise light in a variety of methods. Such as becoming bright enough to blind enemies and become absolutely dark enough to be a shadow.</li>
            <li><strong>Invisibility</strong> - He can manipulate the light around him in order to make himself and those around him invisible.</li>
            <li><strong>Photon Energy Manipulation</strong> - His light can also be used as concussive shockwaves, laser-like photon rays and forcefields.</li>
            <li><strong>Enhanced Flexibility&nbsp;</strong>- &nbsp;His snake-like appearance allows great flexibility and enhanced speed. Able to wrap himself around enemies to constrict and trap them in their place.</li>
            <li><strong>Various Visions</strong> - His eyes can see a wide range of visions such as Infared, X-ray and Night Vision.</li>
        </ul>
    </ul>`,
        weaknesses: `<ul>
        <ul>
            <li><strong>Electromagnetic Radiation</strong> - Electromagnetic sources can interrupt with up his powers and his senses.</li>
            <li><strong>Snake-like Body&nbsp;</strong>- His long and flexible body can is susceptible to being tied up by enemies who are smart and quick enough.</li>
        </ul>
    </ul>`
    },

    {
        name: 'smokescreen',
        img: '/aliens/brand_new/smokescreen.png',
        abilities: `<ul>
        <li><strong>Smoke/Gas Emission&nbsp;</strong>- Smokescreen has the ability to produce a smoke-like gas from the ports on his back, arms, and his mouth, expelling large clouds to disorientate enemies and either surprise attack or evade them.</li>
        <li><strong>Gas Absorption</strong>&nbsp;- He can also absorb gas into his ports and thus convert them into his "smoke&rdquo;.</li>
        <li><strong>Enhanced Senses</strong>&nbsp;- He has vision that&rsquo;s so perfect that he&rsquo;s able to see through his own thick layer of smoke, as well in the dark and bright light. He can also track any kind of sent with his enhanced smell.</li>
        <li><strong>Fire Breath</strong>&nbsp;- He can ignite the gas from his mouth to breathe streams of fire.</li>
        <li><strong>Enhanced Agility</strong>&nbsp;- His lizard-like body allows him to jump high and crawl of vertical surfaces.</li>
        </ul>`,
        weaknesses: `<ul>
        <li><strong>Cloud Dangers</strong>&nbsp;- His large clouds of smoke can spread over bystanders and cause breathing and vision problems for those nearby.</li>
        <li><strong>Small Size</strong>&nbsp;- &nbsp;His 4 foot tall size can be a disadvantage when encountering larger opponents.</li>
        </ul>`
    },

    {
        name: 'digger',
        img: '/aliens/brand_new/digger.png',
        abilities: `<ul>
        <li><strong>Burrowing</strong>&nbsp;- Digger&rsquo;s lower half can twist at a rate so fast that he's able to drill through solid rock, thus traversing underground by sensing the Earth's magnetic field for his location.</li>
        <li><strong>Camouflage</strong>&nbsp;- He can change his skin colour to blend into the environment and make his skin look like stone.</li>
        <li><strong>Underwater Breathing</strong>&nbsp;- He can breathe underwater as if it were air.</li>
        <li><strong>Enhanced Durabilit</strong>y - His exoskeleton body is able to withstand heavy blows.</li>
        <li><strong>Matter Consumption</strong>&nbsp;- He can eat rock and metal.</li>
        </ul>`,
        weaknesses: `<ul>
        <li><strong>Small Size</strong>&nbsp;- His 3 foot tall size can be a disadvantage and his lack of arms can leave to an enemy grabbing his head.</li>
        </ul>`
    },

    {
        name: 'intangisaur',
        img: '/aliens/brand_new/intangisaur.png',
        abilities: `<ul>
        <li><strong>Density Shifting</strong>&nbsp;- Intangisaur possesses the ability to control his own density and thus subtract or multiply his own weight to limitless degrees.</li>
        <li><strong>Flight&nbsp;</strong>- He can decrease his density to the point of being light enough to levitate through the air at fast speeds.</li>
        <li><strong>Intangibility</strong>&nbsp;- His density can decrease beyond weightlessness to achieve intangibility, allowing people and energy to pass through and even walk through solid objects.</li>
        <li><strong>Enhanced Strength and Durability</strong>&nbsp;- He can increase his weight to the point that he can weigh as much as the moon. Becoming strong enough to throw trucks and durable enough to survive falling from the atmosphere.</li>
        <li><strong>Prehensile Tail</strong>&nbsp;- His dinosaur like tail can grab onto objects.</li>
        <li><strong>Space Survivability</strong>&nbsp;- He has the ability the survive in a vacuum.</li>
        </ul>`,
        weaknesses: `<ul>
        <li><strong>Selective Density States</strong>&nbsp;- He can only shift his weight one at a time and thus not be intangible whilst also having super strength.</li>
        <li><strong>Surrounding Damage</strong>&nbsp;- His increased weight can cause structural damage to whatever he's standing on.</li>
        </ul>`
    },

    {
        name: 'hazmat',
        img: '/aliens/brand_new/hazmat.png',
        abilities: `<ul>
        <li><strong>Acid Generation</strong>&nbsp;- Hazmat&rsquo;s body is completely composed of an acidic toxic substance, thus he has the ability to generate acid that can melt any substance, his acid can be utilised as an adhesive goop for binding.</li>
        <li><strong>Acidic Gas Generation</strong>&nbsp;- He can also emit gusts of acidic gas to achieve the same effect as his liquid acid.</li>
        <li><strong>Gaseous Transformation</strong>&nbsp;- He can shift his matter into a gaseous state, thus becoming a cloud of acidic gas.</li>
        <li><strong>Radiation Immunity</strong>&nbsp;- He is immune to harsh levels of radiation and thus can survive in radioactive areas, as well as absorb radiation within himself.</li>
        <li><strong>EMP Emission</strong>&nbsp;- He can emit an electromagnetic pulse from his body, disabling any electronics within his area.</li>
        <li><strong>Enhanced Agility</strong>&nbsp;- &nbsp;Hazmat is extremely flexible and agile, able to bounce around at great speeds.</li>
        </ul>`,
        weaknesses: `<ul>
        <li><strong>Radiation Emission</strong>&nbsp;- He emits low level radiation from his body that can be harmful to humans if they are exposed to him long enough.</li>
        <li><strong>Environmental Hazard</strong>&nbsp;- His acid can also be harmful to his surrounding area if it is not neutralised.</li>
        </ul>`
    },

    {
        name: 'goliath',
        img: '/aliens/brand_new/goliath.png',
        abilities: `<ul>
        <li><strong>Enhanced Strength</strong>&nbsp;- GoLiarth is a 50 foot long turtle like alien, which grants him tremendous strength, easily able to lift a bus with all six limbs.</li>
        <li><strong>Indestructible Amour Platin</strong>g - &nbsp;He possesses an indestructible shell that he can use for either defence or offence. His shell plates extend around his forearms and head for better protection.</li>
        <li><strong>Flight</strong>&nbsp;- His main ability is that he can fly at extreme heights at surprisingly fast speeds, this is mainly used to transport a dozen or so people on his back at any time, as well protecting them with his plates.</li>
        <li><strong>Shell Formation</strong>&nbsp;- He can retract his upper limbs and his head in his shell for extra protection.</li>
        </ul>`,
        weaknesses: `<ul>
        <li><strong>Large Size</strong>&nbsp;- His large size size can be a disadvantage for hiding or working in small spaces.</li>
        <li><strong>Slow Walking Speed</strong>&nbsp;- Despite his flying speed, walking on land is very slow for him due to his large size, clocking in under 5 m/ph.</li>
        <li><strong>Exposed Skin&nbsp;</strong>- His skin is a weak spot for those who can detect them in his neck and arms.</li>
        </ul>`
    },

    {
        name: 'pxl',
        img: '/aliens/brand_new/pxl.png',
        abilities: `<ul>
        <li><strong>Reality Distortion</strong>&nbsp;- PXL constantly generates a unique form of energy called "Pixelate Energy". He uses it to distort reality on significant scale, bending space around as he wishes to "glitch" objects, environments and even living beings in and out of this very dimension. He can even distort himself to become intangible.</li>
        <li><strong>Light Speed Travel</strong>&nbsp;- He can also distort himself therefor&nbsp;allowing him to move at light speed, looking like teleportation.</li>
        <li><strong>Concussive Force Beams and Constructs</strong>&nbsp;- &nbsp;He can utilise his energy into powerful blasts of concussive force. Even able to manipulate this energy into solid objects such as shields, blades, and maces.</li>
        <li><strong>Enhanced Strength</strong>&nbsp;- He displays incredible strength as well, able to rip a car in half with little effort.</li>
        <li><strong>Technopathic</strong>&nbsp;- He also possesses technopathic abilities that allows him to control technology and hack into almost anything.</li>
        <li><strong>Flight</strong>&nbsp;- He can also fly at fast speeds.</li>
        <li><strong>Space Survivability&nbsp;</strong>- &nbsp;He has the ability the survive in a vacuum.</li>
        </ul>`,
        weaknesses: `<ul>
        <li><strong>Power Instability</strong>&nbsp;- While his "Pixelated Energy" is powerful, it can also be incredibly dangerous when left unchecked, PXL could permanently distort reality and even disfigure someone if he affects a living person for too long.</li>
        <li><strong>Detached Limb</strong>s - His head and limbs are detached from his body, so enemies can knock them away or even drag his body through pulling one of his limbs due to them being magnetically connected.His head and limbs are detached from his body, so enemies can knock them away or even drag his body through pulling one of his limbs due to them being magnetically connected.</li>
        <li><strong>Electromagnets</strong>&nbsp;- Electromagnets affects him greatly.</li>
        </ul>`
    },

    {
        name: 'cyclops',
        img: '/aliens/brand_new/cyclops.png',
        abilities: `<ul>
        <li><strong>Telescopic Vision</strong>&nbsp;- Cyclops' one giant eye can see a wide range of distances. Locating distant objects and people within the distant of a lightyear. With this he can search for anything and analyse anything in his sight with exact detail</li>
        <li><strong>Microscopic Vision</strong>&nbsp;- Cyclops can focus his vision on incredibly small subjects as well, focussing on a single atom with precise detail.</li>
        <li><strong>Optic Blast</strong>&nbsp;- He can also project a powerful beam of concussive or laser energy from his eye.</li>
        <li><strong>Varied Vision</strong>&nbsp;- He also possesses X-ray vision, Infared vision, night vision.</li>
        </ul>`,
        weaknesses: `<ul>
        <li><strong>Concentration</strong>&nbsp;- He needs to concentrate hard in order to focus his telescopic and microscopic vision, as well as charging a massive beam of energy can take some time.</li>
        <li><strong>Awkward Appearance</strong>&nbsp;- His gangly appearance can be awkward to move around in, leaving him to be&nbsp;susceptible to trip over.&nbsp;</li>
        <li><strong>Lack of Voice</strong>&nbsp;- He cannot talk whatsoever due to having no mouth, he must communicate through hand gestures (his eye absorbs solar energy for consumption).</li>
        </ul>`
    },

    {
        name: 'acupuncher',
        img: '/aliens/brand_new/acupuncher.png',
        abilities: `<ul>
        <li><strong>Photographic Reflexes</strong>&nbsp;- Acupuncher can instantly replicate the physical movement&nbsp;of anyone after seeing it performed once, including acrobatics, martial arts, and other physical stunts. Meaning he can become an instant master at any form of martial art (human and alien), marksman, and&nbsp;athletic ability.</li>
        <li><strong>Spike Generation</strong>&nbsp;- He&nbsp;can grow and retract his spikes at will, as well as being able to shoot them as projectiles or break them off in order to use them as weapons.</li>
        <li><strong>Enhanced Condition</strong>&nbsp;- Combining his photographic reflexes with his&nbsp;enhanced strength, speed, reflexes, agility, equilibrium and his prehensile feet&nbsp;make him an incredibly proficient fighter and warrior.</li>
        <li>(These skills are stored within the Omnitrix, so when Ben transforms back to human, he will have the moves he learned before hand once he transforms into Acupuncher again, therefor he can build on them)</li>
        </ul>`,
        weaknesses: `<ul>
        <li><strong>Body Limitations&nbsp;</strong>- Acupuncher cannot replicate superhuman abilities, he is only limited to the potential of his own body.</li>
        <li><strong>Visual Lock</strong>&nbsp;- He needs to visually see the movements of whatever he is copying in person, so seeing on a television for example doesn't count.&nbsp;&nbsp;</li>
        </ul>`
    },

    {
        name: 'impath',
        img: '/aliens/brand_new/impath.png',
        abilities: `<ul>
        <li><strong>Emotion Manipulation</strong>&nbsp;- Impath can manipulate the emotions of other beings to make them feel whatever he wants either through touch or looking into their eyes. With this he can change and even enhance emotions for devastating effects, such as sending enemies to a blinding rage so they attack one another, overwhelming them with sadness or incontrollable fear to the point of madness, or even optimistic hope for inspiring others.</li>
        <li><strong>Self Emotional State Manipulation</strong>&nbsp;- He can also enhance his own emotional state for effects like going into a berserker fighting rage, sympathy, relaxation and reasoning, or even becoming emotionless all together for logical thinking.</li>
        <li><strong>Enhanced Agility</strong>&nbsp;- He is also very agile and has some degree of enhanced strength, combined with his four arms makes him effective in combat and climbing.</li>
        </ul>`,
        weaknesses: `<ul>
        <li><strong>Mirrors</strong>&nbsp;- Mirrored surfaces can make his powers backfire on himself and have him be overwhelmed with his own emotions.</li>
        <li><strong>Emotionless Beings</strong>&nbsp;- His powers will not work on emotionalises being like robots or people who have abandoned emotion.</li>
        <li><strong>Emotional Aftermath</strong>&nbsp;- If he uses his powers too much, Ben&rsquo;s human form might have some residual effects from his emotional manipulation.</li>
        </ul>`
    },

    {
        name: 'barnicade',
        img: '/aliens/brand_new/barnicade.png',
        abilities: `<ul>
        <li><strong>Coral Manipulation</strong>&nbsp;- Barnicade can manipulate his coral body to stretch and shape his own body to form organic constructs and create&nbsp;large clusters&nbsp;of coral such as walls and binds.</li>
        <li><strong>Enhanced Strength</strong>&nbsp;- His durable coral body grants him super strength, acting as a sort of armour.</li>
        <li><strong>Water Aided Body Growth</strong>&nbsp;- When he is contact with water, which he can breathe in, he can grow his coral exponentially and grow to the size of a building.</li>
        <li><strong>Regeneration&nbsp;</strong>- He can regenerate his coral at a fast rate.</li>
        </ul>`,
        weaknesses: `<ul>
        <li><strong>Soft Skin</strong>&nbsp;- Whilst his coral is highly durable, his spongey skin is very susceptible to damage and is slow at regenerating.</li>
        <li><strong>Dehydration&nbsp;</strong>- If he is dehydrated, his coral will loose its strength and he will begin to tire.</li>
        </ul>`
    },

    {
        name: 'shriek',
        img: '/aliens/brand_new/shriek.png',
        abilities: `<ul>
        <li><strong>Mana Manipulation</strong>&nbsp;- Shriek can manipulate a unique energy called mana, using it to make forcefields and shoot laser beams out of his antenna and tails.</li>
        <li><strong>Sonic Scream&nbsp;</strong>- He can emit a powerful pink ultrasonic shriek that can cause considerable damage to his targets as well as destroy glass and machinery.</li>
        <li><strong>Flight</strong>&nbsp;- He can fly at fair speeds whilst holding things larger than him with his tails.</li>
        <li><strong>Magic Immunity</strong>&nbsp;- He is immune to magic based powers and artefacts.</li>
        <li><strong>Illumination</strong>&nbsp;- His bright aura can allow light in the dark and using his shriek for echolocation helps in the dark as well.</li>
        </ul>`,
        weaknesses: `<ul>
        <li><strong>Energy Absorption&nbsp;</strong>- His energy can be absorbed and redirected back at him.&nbsp;</li>
        <li><strong>Loose Limbs</strong>&nbsp;- His tails and antenna can be grabbed by enemies and fling him around which makes him loose balance.</li>
        <li><strong>Lack of Magic interest</strong>&nbsp;- Whilst he has the potential to learn magic, Ben doesn&rsquo;t really care to learn it in this form, so he can&rsquo;t really do magic.</li>
        </ul>`
    },

    {
        name: 'lockpick',
        img: '/aliens/brand_new/lockpick.png',
        abilities: `<ul>
        <li><strong>Sharp Claws</strong>&nbsp;- He also possesses sharp talon-like claws that are really strong which he also uses to crawl on pretty much any surface.</li>
        <li><strong>Enhanced Flexibility</strong>&nbsp;- His 10 foot long flexible body is able to quickly ensnare enemies by wrapping himself around them and binding his talons, therefor locking them in place. This can also be used as a form of torture through suffocation.</li>
        <li><strong>Under Water Breathing</strong>&nbsp;- He can breathe underwater and swim at fair speeds.</li>
        <li><strong>Strong Jaws</strong>&nbsp;- He possesses large jaws that shred even metal and chomp through rock.</li>
        </ul>`,
        weaknesses: `<ul>
        <li><strong>Loose Body</strong>&nbsp;- His body is susceptible to being tied up by enemies who are smart and quick enough.</li>
        <li><strong>Dehydration</strong>&nbsp;- He can be severely de-hydrated when in less humid or dry areas, almost to the point of exhaustion.</li>
        </ul>`
    },

    {
        name: 'mothball',
        img: '/aliens/brand_new/mothball.png',
        abilities: `<ul>
        <li><strong>Dust Transformation</strong>&nbsp;- Mothball has the ability to convert his body into tiny dust/ash particles whilst maintaining control&nbsp;and swarm over a large area. Granting him a semi-gaseous state to surround enemies, sneak through small areas and clog machinery.</li>
        <li><strong>Overshadowing</strong>&nbsp;- He can possess the bodies of his enemies by entering them to control their movements, to the point where he can cause them to fly like himself and use his powers.</li>
        <li><strong>Flight</strong>&nbsp;- He can fly at fair speeds.</li>
        <li><strong>Spirit Communication</strong>&nbsp;- He can also communicate with supernatural spirits of the dead and other forms of ghosts.</li>
        </ul>`,
        weaknesses: `<ul>
        <li><strong>Strong Winds</strong>&nbsp;- &nbsp;Large wind can nullify his dust form and scatter it all over the area, his dust can also be breathed by nearby pedestrians and could cause some minor choking if not careful.</li>
        <li><strong>Possession Limits</strong>&nbsp;- Non-cognitive beings and ones with strong wills can refute his overshadowing.</li>
        <li><strong>Self Communication&nbsp;</strong>- As he is the only one who can communicate with the dead, no one else can see them and must go by his word.</li>
        <li><strong>Bright Lights</strong>&nbsp;- He is attracted to bright lights and this can distract him.</li>
        </ul>`
    },

    {
        name: 'sunspot',
        img: '/aliens/brand_new/sunspot.png',
        abilities: `<ul>
        <li><strong>Solar Energy Generation / Manipulation</strong>&nbsp;- Sunspot is essentially a living sun. He can generate, absorb, and manipulate solar energy which can be used for a variety of effects such as immense heat to burn and melt objects, bright light, raw nuclear energy, magnetic fields, and generating solar storms.</li>
        <li><strong>Sun Manifestation&nbsp;</strong>- Sunspot can create and shape stars at any size and stage by accelerating the process. These suns can produce heat, radiation, gravity, light, and a multitude amount of energy.</li>
        <li><strong>Flight</strong>&nbsp;- He is able to fly at very fast speeds.</li>
        <li><strong>Space Survivability</strong>&nbsp;- He can breathe in a vacuum.</li>
        </ul>`,
        weaknesses: `<ul>
        <li><strong>Environmental Hazard</strong>&nbsp;- His power can be extremely dangerous if he exerts too much, the amount of solar radiation can damage nearby civilians in both short and long term.</li>
        <li><strong>Sun Generation</strong>&nbsp;- His suns are exactly what they are, any being close to them will experience radiation, heat, and even disintegration</li>
        <li><strong>Energy Absorption</strong>&nbsp;- If someone either absorbs his power or he uses too much of it, he will be drained severely and will need to recharge to generate more.</li>
        </ul>`
    },

    /* {
        name: 'asdasdads',
        img: '/aliens/brand_new/asdasdasdasd.png',
        abilities: ``,
        weaknesses: ``
    }, */

]
    .sort(() => Math.random() - 0.5) //shuffle array 


//https://www.deviantart.com/thehawkdown/gallery/66867306/ben-10-omnitrix-aliens
//https://www.remove.bg/upload
//https://wordhtml.com