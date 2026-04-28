'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createCategory(data: { name: string, slug: string, icon?: string, attributes: any }) {
  try {
    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        icon: data.icon,
        attributes: data.attributes
      }
    });
    revalidatePath('/admin/categories');
    return { success: true, data: category };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });
    return { success: true, data: categories };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCategory(id: string, data: any) {
  try {
    const category = await prisma.category.update({
      where: { id },
      data
    });
    revalidatePath('/admin/categories');
    return { success: true, data: category };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
