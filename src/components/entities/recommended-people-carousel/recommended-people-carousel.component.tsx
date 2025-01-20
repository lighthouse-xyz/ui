import React from "react";
import { useNavigate } from "react-router-dom";

import EntityCardCarousel from "../entity-card-carousel/entity-card-carousel.component";
import { FilterCategory } from "@src/common/enums/filter-category.enum";
import { TouchOrigin } from "@src/common/enums/track-events.enum";
import { UserCategory } from "@src/common/graphql/generated/user.schema.graphql";
import paths from "@src/common/paths";
import useGetMembers from "@src/hooks/discovery/use-get-members.hook";
import conditionalItem from "@src/utils/conditional-item-in-array.util";

interface Props {
  title: string;
  origin: TouchOrigin;
  category?: UserCategory;
}

const RecommendedPeopleCarousel: React.FC<Props> = ({ title, origin, category }) => {
  const topUsers = 10;

  const navigate = useNavigate();

  const results = useGetMembers({
    first: topUsers,
    offset: 0,
    where: {
      ...(category ? { categories: [category] } : {}),
    },
  });
  const hasUsers = !!results.data && results.data.entities.totalCount > 0;

  const handleViewAllPeople = (): void => {
    navigate(paths.people, {
      state: {
        filters: [...conditionalItem(!!category, { option: category, category: FilterCategory.userCategory })],
      },
    });
  };

  return hasUsers || results.loading ? (
    <EntityCardCarousel
      clickOrigin={origin}
      title={title}
      entitiesResults={results}
      handleViewAll={handleViewAllPeople}
    />
  ) : null;
};

export default RecommendedPeopleCarousel;
