import { Form, useParams, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Hand } from "./Hand";
import styles from "./styles.css";

export type PunctuationFormProps = {
  defaultValue?: number | null
};

const FIBONACCI = [1, 2, 3, 5, 8, 13, 21]

export default function PunctuationForm(props: PunctuationFormProps) {
  const { defaultValue } = props;
  const [punctuation, setPunctuation] = useState<number>(0);
  const submit = useSubmit();

  const {taskId} = useParams();

  useEffect(()=>{
    if(defaultValue === null) return;
    setPunctuation(defaultValue ?? 0);
  },[defaultValue])

  const HandlePunctuate = (value: number) => {
    let formData = new FormData();
    formData.append('action', 'punctuate')
    formData.append("punctuation", value + "");
    submit(formData, {
      method: "post",
      action: `tasks/${taskId}`,
    });
  };

  return (
    <div className="punctation-container">
      <Hand
        onChange={HandlePunctuate}
        value={punctuation}
        values={FIBONACCI}
        block={defaultValue !== null}
      />
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
};