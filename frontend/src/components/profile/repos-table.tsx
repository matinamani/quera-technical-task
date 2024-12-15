'use client'

import dayjs from 'dayjs'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '../data-table'
import { GithubRepoType } from '@/types'
import { approximateTimeDifference } from '@/lib/utils'
import { ArrowUpDown, SquareArrowOutUpRight } from 'lucide-react'

type ReposTableProps = {
  data: GithubRepoType[]
}

const columns: ColumnDef<GithubRepoType>[] = [
  {
    accessorKey: 'name',
    header: () => <p>Repo Name</p>,
    cell: ({ row }) => <p>{row.getValue('name')}</p>,
  },
  {
    accessorKey: 'updated_at',
    header: ({ column }) => (
      <div>
        Last Update
        <ArrowUpDown
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='inline cursor-pointer ms-2 h-4 w-4'
        />
      </div>
    ),
    cell: ({ row }) => {
      const now = dayjs()
      const uat = dayjs(row.getValue('updated_at'))
      return <p>{approximateTimeDifference(now.diff(uat))}</p>
    },
  },
  {
    accessorKey: 'html_url',
    header: () => <p className='text-center'>Link</p>,
    cell: ({ row }) => (
      <a
        className='flex justify-center'
        href={row.getValue('html_url')}
        target='_blank'
      >
        <SquareArrowOutUpRight className='w-4' />
      </a>
    ),
  },
]

export const ReposTable = ({ data }: ReposTableProps) => {
  return <DataTable columns={columns} data={data} />
}
