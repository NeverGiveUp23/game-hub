import { Menu, MenuButton, Button, MenuList, MenuItem, MenuItemOption } from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';

interface Props {
  onSelectedSortOrder: (sortOrder: string) => void
  sortOrder: string;
}

const SortSelector = ({ onSelectedSortOrder, sortOrder}: Props) => {
  const sortOrders = [
    { value: "", label: "Relevance" },
    { value: "-added", label: "Date Added" },
    {value: 'name', label: 'Name'},
    { value: "-released", label: "Release Date" },
    { value: "-metacritic", label: "Popularity" },
    { value: "-rating", label: "Avg Rating" },
  ];

  const currentSortOrder = sortOrders.find((sort) => sort.value === sortOrder);

    return (
      <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDown />}>
          Order By: {currentSortOrder?.label || "Relevance"}
        </MenuButton>
        <MenuList>
          {sortOrders.map((sort) => (
            <MenuItem
              onClick={() => onSelectedSortOrder(sort.value)}
              key={sort.value}
              value={sort.value}
            >
              {sort.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  
}

export default SortSelector