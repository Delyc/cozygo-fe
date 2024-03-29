import { Snapchat, Whatsapp, Instagram, Copy } from "@/components/svgs/Heart"

const Modal = ({link}: any) => {
    const whatsappMessage = encodeURIComponent(link);

    return (
        <div className="flex gap-5  px-10 py-5 rounded">
            <div>{link} <Copy fill={"#757B8D"} height={"30px"} width={"30px"} stroke={"#757B8D"} strokeWidth={0} /></div>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px]">
                <Instagram />
            </a>
            <img src='./assets/twiiter.jpeg' className="w-[30px] h-[30px]" />
            <a href="https://snapchat.com" target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px]">
                <Snapchat />
            </a>
            <a href={`https://wa.me?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px]">
                <Whatsapp />
            </a>
        </div>
    )
}

export default Modal
