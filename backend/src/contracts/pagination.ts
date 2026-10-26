/**
 * The shape every paginated list answers with (ADR 0008).
 *
 * `page` and `limit` are what was applied, not what was asked for. A route
 * builds this from its parsed query and annotates the variable, because
 * `res.json()` does not check an unannotated object literal.
 */
export interface ListMeta {
  page: number;
  limit: number;
  total: number;
}

/** A page of rows plus the meta describing the page. */
export interface Paginated<T> {
  data: T[];
  meta: ListMeta;
}
