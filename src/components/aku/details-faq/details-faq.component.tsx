import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import CollapsibleContent from "../collapsible-content/collapsible-content.component";
import { Box, Container, Divider, Link, Stack, Typography } from "@mui/material";

const DetailsFaq: React.FC = () => {
  const { t } = useTranslation("aku");

  const faq = [
    { question: "detailsFaq.question1.question", answer: "detailsFaq.question1.answer" },
    { question: "detailsFaq.question2.question", answer: "detailsFaq.question2.answer" },
    { question: "detailsFaq.question3.question", answer: "detailsFaq.question3.answer" },
    { question: "detailsFaq.question4.question", answer: "detailsFaq.question4.answer" },
  ];

  const [open, setOpen] = useState<number[]>([]);

  const handleClick = (clickedIndex: number): void => {
    if (open.includes(clickedIndex)) {
      const openCopy = open.filter(element => {
        return element !== clickedIndex;
      });
      setOpen(openCopy);
    } else {
      const openCopy = [...open];
      openCopy.push(clickedIndex);
      setOpen(openCopy);
    }
  };

  return (
    <Container maxWidth="mdLg">
      <Box paddingY={{ xs: 15, sm: 25 }}>
        <Typography fontSize={{ xs: "36px", sm: "40px" }} lineHeight={{ xs: "46px", sm: "51px" }} marginBottom={20}>
          {t("detailsFaq.label")}
        </Typography>
        <Divider color="white" />

        <Stack divider={<Divider color="white" />}>
          {faq.map(({ question, answer }, index) => (
            <CollapsibleContent
              key={`aku-faq-question-${question}`}
              open={open.includes(index)}
              onClick={() => handleClick(index)}
              title={t(question)}
              content={
                <Typography
                  fontSize={{ xs: "16px", smMd: "20px" }}
                  lineHeight={{ xs: "20px", smMd: "28px" }}
                  paddingTop={12}
                  component="div">
                  <Trans
                    i18nKey={answer}
                    ns="aku"
                    components={{
                      Link: (
                        <Link
                          href="https://t.me/+DRvT6-7Gy3hhZGRh"
                          fontWeight={600}
                          target="_blank"
                          rel="noopener"
                          underline="none"
                          color="common.white"
                        />
                      ),
                    }}
                  />
                </Typography>
              }
            />
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default DetailsFaq;
