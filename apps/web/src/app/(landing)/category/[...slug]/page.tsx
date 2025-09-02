import { CategoryPage } from "./categoryPage";

export default async function Page({ params }: { params: Promise<{ productSlug: string[] }> }) {
    const { productSlug } = await params;
    return <CategoryPage categorySlug={productSlug} />;
}