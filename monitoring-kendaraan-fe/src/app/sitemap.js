export default function sitemap(){
    return[
        {
            url:process.env.NEXT_PUBLIC_BASE_URL,
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'login',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'admin/',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'admin/driver',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'admin/driver/add',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'admin/driver/edit',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'admin/fuel-consumption',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'admin/fuel-consumption/edit',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'admin/service-schedule/',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'admin/service-schedule/add',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'admin/service-schedule/edit',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'admin/transport/',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'admin/transport/add',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'admin/transport/edit',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'admin/usage-histories/',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'admin/usage-request/',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'admin/usage-request/edit',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'admin/usage-request/add',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'admin/user/',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'admin/user/add',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'admin/user/edit',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'user/',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'user/usage-request',
            lastModified:new Date()
        },
    ]
}