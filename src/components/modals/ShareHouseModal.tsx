import { Copy, Instagram, Snapchat, Whatsapp } from "../svgs/Heart"

const ShareHouseModal = ({ onCloseShareModal, shareLink, copyLinkAgain }: any) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 flex flex-col items-center gap-5 rounded-lg shadow-lg">
                <button onClick={onCloseShareModal} className='w-full text-xl'>X</button>
                <div className='flex items-center gap-10'>
                    {shareLink}
                    <button onClick={copyLinkAgain}>
                        <Copy fill={"#757B8D"} height={"30px"} width={"30px"} stroke={"#757B8D"} strokeWidth={0} />
                    </button>
                </div>
                <p className='text-primary_gray font-bold'>OR</p>
                <div className='flex gap-5'>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px]">
                        <Instagram />
                    </a>
                    <a href=" https://twitter.com/" target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px]">
                        <img src='./assets/twiiter.jpeg' className="w-[30px] h-[30px]" />
                    </a>

                    <a href="https://snapchat.com" target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px]">
                        <Snapchat />
                    </a>
                    <a href={`https://wa.me?text=${encodeURIComponent(shareLink)}`} target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px]">
                        <Whatsapp />
                    </a>
                </div>

            </div>
        </div>
    )
}

export default ShareHouseModal