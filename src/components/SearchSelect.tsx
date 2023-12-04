import React, { FC, useState, useEffect, useRef } from "react";
import { Flex, Input, List, ListItem } from "@chakra-ui/react";
import { IData } from "../App";

export interface SearchSelectProps {
  options: IData[];
}

export const SearchSelect: FC<SearchSelectProps> = ({
  options,
}): React.ReactElement => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredData = query
    ? options.filter((option) =>
        option.title.toLowerCase().includes(query.toLowerCase())
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleSelect = (option: IData) => {
    setSelectedValue(option.title);
    setQuery("");
    setIsOpen(false);
  };

  const handleSeacrh = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedValue("");
    if (!isOpen) setIsOpen(true);
  };

  return (
    <div ref={wrapperRef}>
      <Input
        placeholder="Search..."
        w="500px"
        type="text"
        value={selectedValue || query}
        onChange={handleSeacrh}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && (
        <Flex
          direction="column"
          mt="10px"
          background="white"
          w="500px"
          h="300px"
          overflowY="auto"
        >
          <List>
            {filteredData.map((option) => (
              <ListItem
                key={option.id.toString()}
                cursor="pointer"
                onClick={() => handleSelect(option)}
              >
                {option.title}
              </ListItem>
            ))}
          </List>
        </Flex>
      )}
    </div>
  );
};
