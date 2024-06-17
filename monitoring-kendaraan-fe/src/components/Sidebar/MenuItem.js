import {AiFillHome} from "react-icons/ai"
import {PiStudentFill} from "react-icons/pi"
import {BiSolidUser} from "react-icons/bi"
import {FaUserSlash, FaUserCheck, FaUserCog} from "react-icons/fa"
import {VscActivateBreakpoints} from "react-icons/vsc"
import {TbHistoryOff,TbHistory} from "react-icons/tb"
import { MdEmojiTransportation } from "react-icons/md";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { FaCodePullRequest } from "react-icons/fa6";


export const MenuItem = [
    {
        name:"Dashboard",
        link:"/admin",
        path:["/admin"],
        icon: <AiFillHome/>
    },
    {
        name:"Driver",
        link:"/admin/driver",
        path:["/admin/driver", "/admin/driver/add","/admin/driver/edit"],
        icon: <FaUserCog/>
    },
    {
        name:"User",
        link:"/admin/user",
        path:["/admin/user", "/admin/user/add", "/admin/user/edit"],
        icon: <BiSolidUser/>
    },
    {
        name:"Transport",
        link:"/admin/transport",
        path:["/admin/transport", "/admin/transport/add", "/admin/transport/edit"],
        icon: <MdEmojiTransportation/>
    },
    {
        name:"Fuel Consumption",
        link:"/admin/fuel-consumption",
        path:["/admin/fuel-consumption", "/admin/fuel-consumption/add", "/admin/fuel-consumption/edit"],
        icon: <BsFillFuelPumpFill/>
    },
    {
        name:"Service Schedule",
        link:"/admin/service-schedule",
        path:["/admin/service-schedule", "/admin/service-schedule/add", "/admin/service-schedule/edit"],
        icon: <RiCalendarScheduleLine/>
    },
    {
        name:"Usage Request",
        link:"/admin/usage-request",
        path:["/admin/usage-request", "/admin/usage-request/add", "/admin/usage-request/edit"],
        icon: <FaCodePullRequest/>
    },
    {
        name:"Usage History",
        link:"/admin/usage-histories",
        path:["/admin/usage-histories"],
        icon:<TbHistory/>
    }
]

export const MenuItemUser = [
    {
        name:"Dashboard",
        link:"/user",
        path:["/user"],
        icon: <AiFillHome/>
    },
    {
        name:"Usage Request",
        link:"/user/usage-request",
        path:["/user/usage-request"],
        icon: <FaCodePullRequest/>
    },
]