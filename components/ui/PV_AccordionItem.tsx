import { ReactNode } from 'react'
import { Accordion } from 'react-bootstrap';

type PV_AccordionItemProps = {
    eventKey: string; // "0" | "1" | "2" etc
    children: ReactNode;
    title: string;
}

export default function PV_AccordionItem({
    eventKey,
    children,
    title
}: PV_AccordionItemProps): JSX.Element {
    return (
        <>
            <style>{`
                .accordion-button {
                    background-color: black;
                }
                .accordion-button:not(.collapsed) {
                    background-color: black;
                }
                .accordion-item {
                    background-color: black;
                }
            `}</style>
            <Accordion.Item eventKey={eventKey}>
                <Accordion.Header>{title}</Accordion.Header>
                <Accordion.Body>
                    {children}
                </Accordion.Body>
            </Accordion.Item>
        </>
    )
}
