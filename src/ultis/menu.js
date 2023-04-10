import icons from "./icons"

const { MdOutlineLibraryMusic, BiNetworkChart, BiNews, BsFillRecordCircleFill } = icons;
export const sidebarMenu = [
    {
        path: 'mymusic',
        text: 'Cá nhân',
        icon: <MdOutlineLibraryMusic size={24} />
    },
    {
        path: '',
        text: 'Khám phá',
        icon: <BsFillRecordCircleFill size={24} />
    },
    {
        path: 'zing-chart',
        text: '#zingchart',
        icon: <BiNetworkChart size={24} />
    },
    {
        path: 'follow',
        text: 'Theo dõi',
        icon: <BiNews size={24} />
    },

]

export const menuManage = [
    {
        id: 1,
        text: 'Profile',
        path: '/profile'
    },
    {
        id: 2,
        text: 'Đăng xuất',
        path: null
    }
]