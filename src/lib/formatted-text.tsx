interface FormattedTextProps {
  text: string;
}

/** Renderiza trechos entre ** assim em negrito. */
export function FormattedText({ text }: FormattedTextProps) {
  const segments = text.split(/(\*\*.+?\*\*)/g);

  return (
    <>
      {segments.map((segment, index) => {
        if (segment.startsWith("**") && segment.endsWith("**")) {
          return <strong key={index}>{segment.slice(2, -2)}</strong>;
        }
        return segment;
      })}
    </>
  );
}
