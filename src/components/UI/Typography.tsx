type TypographyProps = {
    content: string;
    className: string
};

const Paragraph: React.FC<TypographyProps> = ({
    content,
    className
}) => (
    <p className={`${className} text-xs text-primary_gray leading-4 md:text-sm md:leading-5 xl:text-base xl:leading-6`}>{content}</p>
);

export { Paragraph };