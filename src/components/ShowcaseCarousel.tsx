import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { ReactNode, useState } from "react"

interface CarouselProps {
    showWindowHeight: number,
    showWindowWidth: number,
    height: number,
    itemWidth: number,
    gap: number,
    itemsToShow: number,
    items: ReactNode[],
    transistionTime: number,
}

export function ShowcaseCarousel({ showWindowHeight, showWindowWidth, height, itemWidth, gap, items, itemsToShow, transistionTime }: CarouselProps) {
    const [multiIndex, setMultiIndex] = useState(items.length);
    const [animationBlock, setAnimationBlock] = useState(false);
    const [transition, setTransition] = useState(false);

    const multipliedItems: { baseIndex: number, element: ReactNode }[] = []
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < items.length; j++) {
            multipliedItems.push({ baseIndex: j, element: items[j] })
        }
    }

    const showNext = () => {
        if (multiIndex === multipliedItems.length - itemsToShow - 1) {
            console.warn("finish reached")
            setAnimationBlock(true);
            setMultiIndex(multiIndex - items.length);
            setTimeout(() => {
                setAnimationBlock(false);
                setMultiIndex((prev) => prev + 1);
            }, 30);
        } else {
            setMultiIndex((multiIndex + 1));
        }
        setTransition(true)
        setTimeout(() => setTransition(false), transistionTime)
    }

    const showPrevious = () => {
        if (transition) return
        if (multiIndex === 1) {
            console.warn("start reached")
            setAnimationBlock(true);
            setMultiIndex(multiIndex + items.length);
            setTimeout(() => {
                setAnimationBlock(false);
                setMultiIndex((prev) => prev - 1);
            }, 30);
        } else {
            setMultiIndex((multiIndex - 1));
        }
        setTransition(true)
        setTimeout(() => setTransition(false), transistionTime)
    }

    return (
        <>
            <div style={{
                minHeight: 528,
                borderRadius: 24,
                backgroundColor: 'pink',
                overflow: 'hidden',
            }}>
                <div style={{
                    width: "100%",
                    height: showWindowHeight,
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "start",
                    position: "relative",
                    overflow: "hidden",
                }}>

                    <div style={{
                        height: showWindowHeight,
                        display: "flex",
                        flexDirection: "row",
                        position: "absolute",
                        transform: `translateX(-${multiIndex * showWindowWidth}px)`,
                        transition: animationBlock ? "none" : `transform ${transistionTime}ms ease-in-out`,
                    }}>
                        {multipliedItems.map((item, i) => (
                            <div key={i} style={{
                                width: showWindowWidth,
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                overflow: "hidden",
                            }}>
                                {item.element}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ position: "relative" }}>
                <div style={{
                    position: "absolute",
                    width: 160,
                    height: "100%",
                    zIndex: 1,
                    background: "none",
                    border: "4px solid orange",
                    borderRadius: 16,
                    top: -4,
                    left: -4,
                    boxSizing: "content-box"
                }}></div>
                <IconButton onClick={showPrevious} sx={{
                    position: "absolute",
                    top: "50%",
                    left: "-3%",
                    transform: "translateY(-50%)",
                    zIndex: 1,
                    backgroundColor: "white",
                    boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.25)",
                    "&:hover": {
                        backgroundColor: "white"
                    },
                }}>
                    <ChevronLeft />
                </IconButton>

                <IconButton onClick={showNext} sx={{
                    position: "absolute",
                    top: "50%",
                    right: "-3%",
                    transform: "translateY(-50%)",
                    zIndex: 1,
                    backgroundColor: "white",
                    boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.25)",
                    "&:hover": {
                        backgroundColor: "white"
                    },
                }}>
                    <ChevronRight />
                </IconButton>
                <div style={{
                    width: "100%",
                    height: height,
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "start",
                    position: "relative",
                    overflow: "hidden",
                }}>

                    <div style={{
                        height: height,
                        display: "flex",
                        flexDirection: "row",
                        position: "absolute",
                        gap: gap,
                        transform: `translateX(-${multiIndex * itemWidth + multiIndex * gap}px)`,
                        transition: animationBlock ? "none" : `transform ${transistionTime}ms ease-in-out`,
                    }}>
                        {multipliedItems.map((item, i) => (
                            <div key={i} style={{
                                width: itemWidth,
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                overflow: "hidden",
                                borderRadius: 8
                            }}>
                                {item.element}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}