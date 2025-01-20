import React from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as ArrowDown } from "@src/assets/icons/literal-arrow-down-icon.svg";
import { ReactComponent as ArrowUp } from "@src/assets/icons/literal-arrow-up-icon.svg";
import { FilterCategory, isSortByFilter } from "@src/common/enums/filter-category.enum";
import { EventSortingMethod, World } from "@src/common/graphql/generated/discovery.schema.graphql";
import { MenuOption } from "@src/common/interfaces/menu-option.interface";
import WorldLogo from "@src/components/common/world-logo/world-logo.component";
import { resources } from "@src/locales/i18n";
import getTitleCase from "@src/utils/convert-camel-case-to-title-case.util";

type Enum<E> = Record<keyof E, number | string> & { [k: number]: string };

type CategoryEnumName = "placeCategory" | "eventCategory" | "userCategory";

interface EnumUtils {
  getEnumValueLabel: (keyValue: string, enumName: keyof typeof resources.en.common.enum) => string;
  getMenuOptionArrayFromEnum: <E extends Enum<E>>(
    enumType: E,
    category: FilterCategory,
    exclude?: string[],
  ) => MenuOption[];
  getCategoryMapFromEnum: <E extends Enum<E>>(
    enumType: E,
    enumName: CategoryEnumName,
    exclude?: string[],
    forceFirst?: string[],
  ) => Record<string, string>;
}

function useEnum(): EnumUtils {
  const { t } = useTranslation();

  const getEnumValueLabel = (keyValue: string, enumName: keyof typeof resources.en.common.enum): string => {
    return t(`enum.${enumName}.${keyValue}` as keyof (typeof resources.en.common.enum)[typeof enumName], {
      defaultValue: getTitleCase(keyValue),
    });
  };

  const getMenuOptionArrayFromEnum = <E extends Enum<E>>(
    enumType: E,
    category: FilterCategory,
    exclude: string[] = [],
  ): MenuOption[] => {
    const enumName = isSortByFilter(category) ? "sort" : (category as keyof typeof resources.en.common.enum);

    const ascRegex = /^(.+)Asc$/;
    const descRegex = /^(.+)Desc$/;

    const menuOptionArray: MenuOption[] = [];

    Object.keys(enumType).forEach(key => {
      if (exclude.includes(key)) {
        return;
      }

      let icon;
      if (ascRegex.test(key) && key !== EventSortingMethod.nextStartAtAsc) {
        icon = <ArrowUp />;
      }
      if (descRegex.test(key)) {
        icon = <ArrowDown />;
      }
      if (key in World) {
        icon = <WorldLogo world={key as World} />;
      }

      menuOptionArray.push({
        option: key,
        label: getEnumValueLabel(key, enumName),
        icon,
      });
    });

    return menuOptionArray;
  };

  const getCategoryMapFromEnum = <E extends Enum<E>>(
    enumType: E,
    enumName: CategoryEnumName,
    exclude: string[] = [],
    forceFirst: string[] = [],
  ): Record<string, string> => {
    const categoryMap: Record<string, string> = {};

    forceFirst?.forEach(key => {
      if (exclude.includes(key)) {
        return;
      }

      categoryMap[key] = getEnumValueLabel(key, enumName);
    });

    Object.keys(enumType).forEach(key => {
      if (exclude.includes(key) || forceFirst.includes(key)) {
        return;
      }

      categoryMap[key] = getEnumValueLabel(key, enumName);
    });

    return categoryMap;
  };

  return { getCategoryMapFromEnum, getEnumValueLabel, getMenuOptionArrayFromEnum };
}

export { useEnum };
