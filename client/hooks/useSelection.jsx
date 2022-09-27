import { Button, Checkbox } from "@mantine/core";
import { useState } from "react";

export default function useSelection(candidats) {
  const [selected, setSelected] = useState(new Set());

  const CheckboxSelectOne = (props) => {
    const { candidat } = props;
    return (
      <Checkbox
        checked={selected.has(candidat)}
        onChange={(event) =>
          setSelected((previouslySelected) =>
            event.currentTarget.checked
              ? new Set(previouslySelected.add(candidat))
              : new Set([...previouslySelected].filter((c) => c !== candidat))
          )
        }
        {...props}
      />
    );
  };

  const CheckboxSelectAll = (props) => (
    <Checkbox
      checked={selected.size === candidats.length}
      onChange={(event) =>
        setSelected(() =>
          event.currentTarget.checked ? new Set(candidats) : new Set()
        )
      }
      {...props}
    />
  );

  const ButtonInvertSelection = (props) => (
    <Button
      onClick={() =>
        setSelected(new Set(candidats.filter((c) => !selected.has(c))))
      }
      {...props}
    />
  );

  return {
    CheckboxSelectOne,
    CheckboxSelectAll,
    ButtonInvertSelection,
    selected: [...selected],
  };
}
