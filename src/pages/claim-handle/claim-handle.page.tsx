import React from "react";

import "swiper/css";
import { Image, PageContainer } from "./claim-handle.style";
import HandleClaimedStep from "./steps/handle-claimed-step/handle-claimed-step.component";
import PickHandleStep from "./steps/pick-handle-step/pick-handle-step.component";
import SignInStep from "./steps/sign-in-step/sign-in-step.component";
import { Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import Footer from "@src/components/layout/footer/footer.component";
import { Swiper, SwiperSlide } from "swiper/react";

const ClaimHandle: React.FC = () => {
  const theme = useTheme();

  const splitScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Stack>
      <PageContainer>
        <Grid container alignItems="center" justifyContent="center" minHeight="100vh" minWidth="100vw">
          {splitScreen && (
            <Grid item xs={0} md={6} height="100vh">
              <Image />
            </Grid>
          )}
          <Grid item xs={12} md={6} marginY="64px">
            <Container maxWidth="smMd">
              <Swiper spaceBetween={5} allowTouchMove={false}>
                <SwiperSlide>
                  <SignInStep />
                </SwiperSlide>
                <SwiperSlide>
                  <PickHandleStep />
                </SwiperSlide>
                <SwiperSlide>
                  <HandleClaimedStep />
                </SwiperSlide>
              </Swiper>
            </Container>
          </Grid>
        </Grid>
      </PageContainer>

      <Footer />
    </Stack>
  );
};

export default ClaimHandle;
