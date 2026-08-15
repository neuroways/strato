export function Breadcrumbs({ items = [] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 sm:gap-2 flex-wrap">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1 sm:gap-2">
            {index > 0 && (
              <span className="text-nw-light-gray mx-0.5" aria-hidden="true">
                /
              </span>
            )}
            {item.route ? (
              <a
                href={item.route}
                className="text-xs sm:text-sm font-bold text-nw-navy hover:text-nw-teal transition-colors focus:outline-2 focus:outline-nw-teal focus:outline-offset-2 rounded-small"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-xs sm:text-sm font-bold text-nw-teal">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
