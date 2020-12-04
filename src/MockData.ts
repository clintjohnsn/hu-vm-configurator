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
    ]
}


export default mockData;