import { Form, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Cards } from "./cards";
import { Hand } from "./Hand";
import styles from "./styles.css";

export type PunctuationFormProps = {
  defaultValue?: number | null
};

const FIBONACCI = [1, 2, 3, 5, 8, 13, 21]

export default function PunctuationForm(props: PunctuationFormProps) {
  const { defaultValue } = props;
  const [punctuation, setPunctuation] = useState<number>(0);

  useEffect(()=>{
    if(defaultValue === null) return;
    setPunctuation(defaultValue ?? 0);
  },[defaultValue])

  const submit = useSubmit();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let $form = event.currentTarget;
    let formData = new FormData($form);
    submit(formData, {
      method: $form.getAttribute("method") ?? $form.method,
      action: $form.getAttribute("action") ?? $form.action,
    });
  };

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <div className="punctation-form-container">
        <Cards
          onChange={(v) => setPunctuation(v)}
          value={punctuation}
          values={FIBONACCI}
          block={defaultValue !== null}
        /> 

       <Hand
          onChange={(v) => setPunctuation(v)}
          value={punctuation}
          values={FIBONACCI}
          block={defaultValue !== null}
        />
        <input
          type="hidden"
          name="action"
          value={defaultValue !== null ? "close" : "punctuate"}
        />
        <input type="hidden" name="punctuation" value={punctuation + ""} />
        <button
          type="submit"
          className="rounded bg-rose-700 px-4 py-2 text-rose-100 hover:bg-blue-500 active:bg-rose-600"
        >
          {defaultValue !== null ? "Revelar" : "Confirmar"}
        </button>
      </div>
    </Form>
  );
}


export function links() {
  return [{ rel: "stylesheet", href: styles }];
};