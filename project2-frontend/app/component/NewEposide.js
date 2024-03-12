import CardScroll from "./OtherComponent/CardScroll";
import { MotionDiv } from "./OtherComponent/MotionDiv";

function NewEposide() {
    const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }]
    return (
        <div id="controls-carousel" class="relative w-full" data-carousel="static">
            <MotionDiv
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <CardScroll data={data} cardid="Tập mới" />
            </MotionDiv>
        </div>
    );
}

export default NewEposide;