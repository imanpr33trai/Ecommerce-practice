import ProductPage from "../../(landing)/(products)/[productSlug]/product-page";

export default async function Page({ params }: { params: Promise<{ productSlug: string }> }) {
  const { productSlug } = await params;
  return <ProductPage productSlug={productSlug} />;
}