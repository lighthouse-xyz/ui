import React, { useState } from "react";
import { FormContainer, useForm } from "react-hook-form-mui";
import { useTranslation } from "react-i18next";

import { CheckButton, StyledTextField, SuccessButton } from "./quest-input.style";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ReactComponent as ArrowRight } from "@src/assets/icons/literal-arrow-right-icon.svg";
import { ReactComponent as SuccessIcon } from "@src/assets/icons/tick-circle-icon.svg";
import { AkuQuest, AkuQuestType } from "@src/common/graphql/generated/user.schema.graphql";
import useValidateAkuAnswer from "@src/hooks/user/use-validate-aku-answer.hook";
import useToast from "@src/hooks/utils/use-toast.hook";

interface Props {
  day: string;
  quests: AkuQuest[];
  userId?: string;
  disabled?: boolean;
  setOpenTooltip?: (open: boolean) => void;
}

const QuestInput: React.FC<Props> = ({ day, userId, quests: questsList, disabled = false, setOpenTooltip }) => {
  const { t } = useTranslation("aku");
  const { showToast } = useToast({ variant: "error" });

  const quests = {
    [AkuQuestType.main]: questsList.find(quest => quest.type === AkuQuestType.main),
    [AkuQuestType.extra]: questsList.find(quest => quest.type === AkuQuestType.extra),
    [AkuQuestType.extraWithoutValidation]: questsList.find(quest => quest.type === AkuQuestType.extraWithoutValidation),
  };

  const formContext = useForm<{ [key in AkuQuestType]: string }>({
    defaultValues: {
      [AkuQuestType.main]: quests.main?.answer,
      [AkuQuestType.extra]: quests.extra?.answer,
      [AkuQuestType.extraWithoutValidation]: quests.extraWithoutValidation?.answer,
    },
  });
  const { getValues, setError, clearErrors } = formContext;

  const [currentQuestId, setCurrentQuestId] = useState<string>();

  const { validateAnswer, loading } = useValidateAkuAnswer();

  const handleCheckClick = (questId: string, questType: AkuQuestType): void => {
    const answerValue = getValues(questType);

    if (!answerValue) {
      setError(questType, { message: t("error.required") });
    }
    if (userId && answerValue) {
      setCurrentQuestId(questId);
      void validateAnswer({
        variables: { input: { questId, answer: answerValue }, userId },
        onCompleted: data => {
          if (!data.validateAkuAnswer.isAnswerValid) {
            setError(questType, { message: t("error.wrongAnswer") });
          }
        },
        onError: error => {
          const huntsNotStartedError = error.graphQLErrors?.find(({ extensions }) => extensions.code === "FORBIDDEN");
          showToast(huntsNotStartedError ? t("warning.huntsNotStarted") : t("error.generic"));
        },
      });
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    questType: AkuQuestType,
  ): void => {
    if (event.target.value) {
      clearErrors(questType);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography color="common.white" fontSize="22px" lineHeight="28px" fontWeight={700} marginLeft={5}>
        {t("questForm.day", { day })}
      </Typography>

      <FormContainer formContext={formContext} onSuccess={() => undefined}>
        <Stack spacing={4}>
          {Object.values(quests)?.map(quest =>
            quest ? (
              <Stack key={`quest-input-${quest.questId}`} spacing={2}>
                {!!quest.question && (
                  <Typography fontSize="22px" lineHeight="28px" marginLeft={5}>
                    {quest.question}
                  </Typography>
                )}
                <Stack direction="row" spacing={4} alignItems="flex-start">
                  {quest.answer ? (
                    <>
                      <StyledTextField
                        variant="outlined"
                        name={quest.type}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <SuccessButton color="inherit" disableRipple>
                        <SuccessIcon />
                      </SuccessButton>
                    </>
                  ) : (
                    <>
                      <StyledTextField
                        variant="outlined"
                        name={quest.type}
                        placeholder={t("questForm.answer")}
                        disabled={disabled}
                        onChange={e => handleInputChange(e, quest.type)}
                      />
                      <span onClick={setOpenTooltip ? () => setOpenTooltip(true) : undefined}>
                        <CheckButton
                          disabled={disabled || (loading && currentQuestId === quest.questId)}
                          color="inherit"
                          onClick={() => handleCheckClick(quest.questId, quest.type)}>
                          {loading && currentQuestId === quest.questId ? (
                            <CircularProgress color="inherit" size={24} />
                          ) : (
                            <ArrowRight />
                          )}
                        </CheckButton>
                      </span>
                    </>
                  )}
                </Stack>
              </Stack>
            ) : null,
          )}
        </Stack>
      </FormContainer>
    </Stack>
  );
};

export default QuestInput;
