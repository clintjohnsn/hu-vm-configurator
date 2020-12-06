const x86 = "64-bit (x86)";
const ARM = "64-bit (ARM)";

const mockData = {
    regions:["us-east-1", "us-east-2", "us-west-1", "india-1"],
    images:[
        {
            id:1,
            name:'Linux 2 Image',
            desc:'Linux 2 comes with 5 years of support. It provides Linux Kernel 4.14 tuned for optimal performance',
            variations:[x86,ARM],
            cost: 243.61,
            region:["us-east-1", "us-east-2", "us-west-1", "india-1"],
        },
        {
            id:2,
            name:'Ubuntu Server 18.04 LTS',
            desc:'Ubuntu Server 18.04 LTS comes with 5 years of support. It provides Ubuntu Server 18.04 LTS tuned for optimal performance',
            variations:[x86,ARM],
            cost: 243.61,
            region:["us-east-1", "us-east-2", "us-west-1", "india-1"],
        },
        {
            id:3,
            name:'Red Hat Enterprise Linux 8',
            desc:'Red Hat Enterprise Linux 8 comes with 5 years of support. It provides Red Hat Enterprise Linux 8 tuned for optimal performance',
            variations:[x86,ARM],
            cost: 300,
            region:["us-east-1", "us-east-2", "us-west-1", "india-1"],
        },
        {
            id:4,
            name:'Microsoft Windows Server 2019 Base',
            desc:'Microsoft Windows Server 2019 Base comes with 5 years of support. It provides Microsoft Windows Server 2019 Base tuned for optimal performance',
            variations:[ARM],
            cost: 338.77,
            region:["us-east-1", "us-east-2"],
        },
        {
            id:5,
            name:'SUSE Linux Enterprise Server',
            desc:'SUSE Linux Enterprise Server comes with 5 years of support. It provides SUSE Linux Enterprise Server tuned for optimal performance',
            variations:[x86,ARM],
            cost: 200.22,
            region:["us-east-1", "us-east-2", "us-west-1", "india-1"],
        },
    ],
    instances:[
        {
            id:1,
            name:"gp",
            desc:"General Purpose",
            memory:[
                {val:"256 MB",cost:0},
                {val:"512 MB", cost:0},
                {val:"1 GB", cost:0},
                {val:"2 GB",cost:0},
                {val:"4 GB", cost:0},
            ],
            cpu:[
                {val:"1 Core",cost:0},
                {val:"2 Core",cost:0},
                {val:"4 Core",cost:0},   
            ],
        },
        {
            id:2,
            name:"strg",
            desc:"Storage Optimized",
            memory:[
                {val:"16 GB", cost:0},
                {val:"32 GB",cost:20},
                {val:"64 GB", cost:40},
            ],
            cpu:[
                {val:"1 Core",cost:0},
                {val:"8 Core",cost:20},
                {val:"16 Core",cost:40},   
            ],
        },
        {
            id:3,
            name:"nwrk",
            desc:"Network Optimized",
            memory:[
                {val:"256 MB",cost:0},
                {val:"512 MB", cost:0},
                {val:"1 GB", cost:0},
                {val:"2 GB",cost:0},
                {val:"4 GB", cost:0},
                {val:"16 GB", cost:0},
                {val:"32 GB",cost:20},
                {val:"64 GB", cost:40},
            ],
            cpu:[
                {val:"1 Core",cost:0},
                {val:"2 Core",cost:0},
                {val:"4 Core",cost:0},
                {val:"8 Core",cost:20},
                {val:"16 Core",cost:40},   
            ],
        },
        {
            id:4,
            name:"cmpt",
            desc:"Compute Optimized",
            memory:[
                {val:"16 GB", cost:0},
                {val:"32 GB",cost:20},
                {val:"64 GB", cost:40},
            ],
            cpu:[
                {val:"1 Core",cost:0},
                {val:"2 Core",cost:0},
                {val:"8 Core",cost:20},
                {val:"16 Core",cost:40},   
            ],
        },
    ],
    storage:[
            {
                id:1,
                name:"SSD",
                minCapacity:20,
                maxCapacity:512,
                cost:40,
            },
            {
                id:2,
                name:"Magnetic Disk",
                minCapacity:40,
                maxCapacity:2048,
                cost:20,
            }
        ]
}


export default mockData;